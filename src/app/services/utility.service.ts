import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  calcularFinalPrice(price:number,discount:number):number{
    let finalprice=price-(price*discount/100);
    return finalprice
  }
}
