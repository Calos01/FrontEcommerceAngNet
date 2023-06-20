import { Component, OnInit } from '@angular/core';
import { Cart, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  
  constructor(private navigateService:NavigationService, public _utilityService:UtilityService) { 
  }
  cart:Cart={
    id:0,
    user:this._utilityService.getUser(),
    cartItems:[],
    ordered:false,
    orderedon:""
  }
  cartPrevious:Cart[]=[];
  UserPaymentInfo:Payment={
    id:0,
    user: this._utilityService.getUser(),
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
  
  ngOnInit(): void {
    this.navigateService.getCartActive(this._utilityService.getUser().userId).subscribe((dat:any)=>{
      this.cart=dat;
      this._utilityService.calcularPaymet(this.cart,this.UserPaymentInfo);
      console.log(this.cart);
    });
    this.navigateService.getPreviousCart(this._utilityService.getUser().userId).subscribe((dat:any)=>{
      this.cartPrevious=dat;
    });
  }
}
