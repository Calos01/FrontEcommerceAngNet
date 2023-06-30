import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Cart, Order, Payment, PaymentMethod } from '../models/models';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  metodopagoname='';
  metodopagoform:FormControl =new FormControl('0')
  paymentMethods:PaymentMethod[]=[];
  //gira spinner  
  spinner=false;
  messageOrden='';
  classcolor='';

  cart:Cart={
    id:0,
    user:this.serviceUtility.getUser(),
    cartItems:[],
    ordered:false,
    orderedon:""
  }
  cartPrevious:Cart[]=[];
  UserPaymentInfo:Payment={
    id:0,
    user: this.serviceUtility.getUser(),
    paymentMethod:{
      id:0,
      tipo: "",
      proveedor: "",
      disponible:false,
      razon:""
    },
    montoTotal:0,
    montoDescuento:0,
    precioPagar:0,
    costoEnvio:0 ,
    createdAt:""
  }

  constructor(private _serviceNavigation:NavigationService, public serviceUtility:UtilityService, private router:Router) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
  ngOnInit(): void {
    this.metodopagoform.valueChanges.subscribe((res:any)=>{
      if(res=='0'){
        this.metodopagoname=''
      }else{
        this.metodopagoname=res.toString();
      }
    });
    //Lista Payment methods
    this._serviceNavigation.getPaymentMethods().subscribe((dat:any)=>{
      this.paymentMethods=dat;
      // console.log(this.paymentMethods);
    })
    //cuadro de order
    this._serviceNavigation.getCartActive(this.serviceUtility.getUser().userId).subscribe((dat:any)=>{
      this.cart=dat;
      this.serviceUtility.calcularPaymet(this.cart,this.UserPaymentInfo);
    });
    
  }
  // para añadir el nombre de pago que se pone en el select hacia el cuadro de datos de pago
  getformatoPayment(id:string){
    let x = this.paymentMethods.find((v)=>v.id==parseInt(id));
    return x?.tipo+' - '+x?.proveedor 
  }

  //boton Pagar efecto cambiando mensaje en segundos con timer
  realizarOrden(){
    this.spinner=true;
    let pagoexitoso=this.realizopago();
    if(pagoexitoso==false){
      this.spinner=false;
      this.messageOrden="NO SE PUDO REALIZAR LA ORDEN";
    }else{
      let step=0;
      let count=timer(0,3000).subscribe((dat)=>{
        ++step;
        if(step==1){
          this.messageOrden='Procesando su orden';
          this.classcolor='text-success';
        }
        if(step==2){
          this.messageOrden='Verificando el pago'
        }
        if(step==3){
          this.messageOrden='Se ha realizado el pago. Su orden ha sido guardada'
          this.spinner=false; 
        } 
        if(step==4){
          this.router.navigateByUrl('/home');
          count.unsubscribe();
        }   
      });     
    }
    this.guardarOrden();
  }
  realizopago(){
    return true;
  }
  //generar pdf pago
  generapdf(){
    const pdfDefinition:any={
        content:[
        { text: 'Logo de la Empresa', alignment: 'center', margin: [0, 0, 0, 10] },
        { text: 'Recibo', style: 'header' },
        { text: 'Fecha: ', style: 'subheader' },
        { text: 'Cliente: ' + this.UserPaymentInfo.user.firstName },
        { text: 'Total: ' + this.UserPaymentInfo.precioPagar },
        { text: 'Productos:', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['Id', 'Nombre', 'Subtotal'],
              ...this.cart.cartItems.map((cartitem: any) => [cartitem.id, cartitem.producto.title, cartitem.producto.price])
            ]
          },
          layout: {
            fillColor: '#3498db'
          } 
        }  
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5]
        }
      },
      defaultStyle: {
        fontSize: 12
      }
    };
    
    pdfMake.createPdf(pdfDefinition).open();
  }

  //Para guardar datos de orden y pago
  guardarOrden(){
    let payment: Payment;
    let pmid=0;
    if(this.metodopagoform){
        pmid=parseInt(this.metodopagoform.value);
    }

    payment={
      id:0,
      user: this.serviceUtility.getUser(),
      paymentMethod:{
        id:pmid,
        tipo: "",
        proveedor: "",
        disponible:false,
        razon:""
      },
      montoTotal: this.UserPaymentInfo.montoTotal,
      montoDescuento:this.UserPaymentInfo.montoDescuento,
      precioPagar:this.UserPaymentInfo.precioPagar,
      costoEnvio:this.UserPaymentInfo.costoEnvio,
      createdAt:""
    }

    this._serviceNavigation.insertPayment(payment).subscribe((dat:any)=>{
      payment.id=parseInt(dat);
      let orden:Order={
        id:0,
        user:this.serviceUtility.getUser(),
        cart:this.cart,
        payment:payment,
        createdat:''
      }
      
      //cambiamos el numero del carrito a 0 cuando se realizo la orden
      this._serviceNavigation.insertOrden(orden).subscribe((dat:any)=>{
        this.serviceUtility.changenroItem.next(0);
      })  
    })
  }
}
