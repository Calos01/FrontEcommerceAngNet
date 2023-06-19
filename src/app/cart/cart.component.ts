import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/models';
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
  ngOnInit(): void {
    this.navigateService.getCartActive(this._utilityService.getUser().userId).subscribe((dat:any)=>{
      this.cart=dat;
    })
  }

}
