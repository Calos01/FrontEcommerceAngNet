import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Product, Review } from '../models/models';
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
  otrosReviews:Review[]=[];

  ngOnInit(): void { 
    //obtener producto detail
    this.aroute.queryParams.subscribe((param:any)=>{
      let prodid=param.id;
      this._navigationService.getProduct(prodid).subscribe((data:any)=>{
        this.product=data;
      })
    })
    this.listadoreviews();
    console.log(this.product);
  } 

  constructor(private _navigationService:NavigationService, private aroute:ActivatedRoute, public utilityService:UtilityService) {

  }
  saveReview(){
    let review=this.controlReview.value;
    
    if((review=='')||(review==null)){
      this.showError=true;
    }
    //XD sino el review no reconoce piensa q siempre sera null
    if(review !=null){
      this._navigationService.submitReview(this.utilityService.getUser().userId,this.product.id,review).subscribe(dat=>{
        this.savedReview=true;
        this.listadoreviews();
        this.controlReview.setValue('');
      });
    }
    
  }
  listadoreviews(){
    this._navigationService.listreview(this.product.id).subscribe((dat:any[])=>{
      for(let rev of dat){
        this.otrosReviews.push(rev)
      }
    })
  }
}
