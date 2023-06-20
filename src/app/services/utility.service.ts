import { Injectable } from '@angular/core';
import { Cart, Payment, Product, User } from '../models/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changenroItem= new Subject();
  constructor(private jwt:JwtHelperService, private _navigationService:NavigationService) { }

  calcularFinalPrice(price:number,discount:number):number{
    let finalprice=price-(price*discount/100);
    return finalprice
  }
  /**
   * *Metodos utilizados en el login component metodo Logearse()
   * ?token.id , token.firstname,etc son los nombres de los claims en el backend
   * !estamos decodeando el token del payload para pasarlo a nuestra interfaz User
   * @jwt.decodeToken nos trae el token decifrado que envio JwtModule.forRoot del appmodule
   */
  getUser():User
    {
      let token= this.jwt.decodeToken();
      let user:User={
        userId: token.id,
        firstName: token.firstname,
        lastName: token.lasname,
        email: token.email,
        address: token.address,
        mobile: token.mobile,
        password: "",
        createdAt: token.createdat,
        modifiedAt: token.modifiedat   
      };
      return user;
    }
  /**
   * *setUser() recibira el token del login component al momento en q el user se logea y lo pondra en 'user'
   * ?'user' llega en el root que esta en al app.module quien tiene la config del api 
   */

  setUser(token:string){
    localStorage.setItem('user',token)
  }
  estaLogeado(){
    return localStorage.getItem('user')
  }
  removeUser(){
    localStorage.removeItem('user')
  }

  /**
   * *Metodos utilizado para aumentar el nro de Item en el header carrito
   * ?Usamos changenroItem= new Subject(); que emite y recibe eventos, valores a la vez
   * !.next para emitir y subscribe para recibir
   * @
   */
  addNroItem(product:Product){
    let productid=product.id;
    let userid=this.getUser().userId;
    this._navigationService.addCart(userid, productid).subscribe((res:any)=>{
      
      if(res.toString()=='insertado'){
        this.changenroItem.next(1);
      }
    })
  }

  //Calcular payment
  calcularPaymet(cart:Cart,payment:Payment){
    payment.montoTotal=0;
    payment.montoDescuento=0;
    payment.precioPagar=0;

    for(let item of cart.cartItems){
      payment.montoTotal+=item.producto.price;
      payment.montoDescuento+=item.producto.price-this.calcularFinalPrice(item.producto.price,item.producto.offer.discount);
      payment.precioPagar+=this.calcularFinalPrice(item.producto.price,item.producto.offer.discount);
    }
    if(payment.precioPagar>20000){
      payment.costoEnvio=2000
    }
    else if(payment.precioPagar>=5000){
      payment.costoEnvio=500
    }
    else if(payment.precioPagar>=1000){
      payment.costoEnvio=300
    }
    else{
      payment.costoEnvio=200
    }
  }

  //Calcular Precio Pagado
  calularPrecioPagado(cart:Cart){
    var total=0;
    for(let item of cart.cartItems ){
      total += this.calcularFinalPrice(item.producto.price,item.producto.offer.discount);
    }
    return total;
  }
}
