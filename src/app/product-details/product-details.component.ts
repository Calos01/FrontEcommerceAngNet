import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imageindex: number=1;
  product!: Product;
  ngOnInit(): void { 
    //obtener producto detail
    this.aroute.queryParams.subscribe((param:any)=>{
      let prodid=param.id;
      this._navigationService.getProduct(prodid).subscribe((data:any)=>{
        this.product=data;
      })
    })
    console.log(this.product);
  } 

  constructor(private _navigationService:NavigationService, private aroute:ActivatedRoute, public utilityService:UtilityService) {

  }

}
