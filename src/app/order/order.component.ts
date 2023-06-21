import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Cart, Payment, PaymentMethod } from '../models/models';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
      //console.log(this.paymentMethods);
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
        } 
        if(step==4){
          this.router.navigateByUrl('/home');
          count.unsubscribe();
        }
      });
    }
  }
  realizopago(){
    return true;
  }
}
