import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imageindex: number=1;
  product!: Product;
  controlReview = new FormControl('');
  showError:boolean=false;
  savedReview:boolean=false;

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
  saveReview(){
     let review=this.controlReview.value;
    if((review=='')||(review=null)){
      this.showError=true;
    }
    return true;
  }

}
