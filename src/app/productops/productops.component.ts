import { Component, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-productops',
  templateUrl: './productops.component.html',
  styleUrls: ['./productops.component.css']
})
export class ProductopsComponent implements OnInit{
view: 'grid'|'list'='list'
sortby: 'default'|'lth'|'htl'='default'
products:Product[]=[];

constructor(private aroute:ActivatedRoute, private _servicenavigation:NavigationService, private _serviceutility:UtilityService) {

}
  ngOnInit(): void {
    this.aroute.queryParams.subscribe((params:any)=>{
      let category=params.category;
      let subcategory=params.subcategory;
      if(category && subcategory){
        this._servicenavigation.getProductos(category,subcategory,10).subscribe((dat:any)=>{
          this.products=dat;
        })
      }
    })
  }
}
