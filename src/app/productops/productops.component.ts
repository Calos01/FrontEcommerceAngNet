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

constructor(private aroute:ActivatedRoute, private _servicenavigation:NavigationService, private _serviceutility:UtilityService) {}
  ngOnInit(): void {
    this.aroute.queryParams.subscribe((params:any)=>{
      let category=params.category;
      let subcategory=params.subcategory;
      if(category && subcategory){
        this._servicenavigation.getProductos(category,subcategory,10).subscribe((dat:any)=>{
          this.products=dat;
        })
      }
    });
  }
  //Filtro para Ordenar 
  sortByPrecio(filter:string){
    this.products.sort((a,b):any=>{
      // ascendente por id
      if(filter=='default'){
        return a.id>b.id?1:-1;
      }
      // De menor a mayor 1:-1
      if(filter=='lth'){
        return this._serviceutility.calcularFinalPrice(a.price,a.offer.discount)>this._serviceutility.calcularFinalPrice(b.price,b.offer.discount)?1:-1;
      }
      // De mayor a menor -1:1
      if(filter=='htl'){
        return this._serviceutility.calcularFinalPrice(a.price,a.offer.discount)>this._serviceutility.calcularFinalPrice(b.price,b.offer.discount)?-1:1;
      }
      //ESTO NO FUNCIONA ES PARA NO USAR LOS IFS
      // (filter=='htl'?1:-1)*
      //   (this._serviceutility.calcularFinalPrice(a.price,a.offer.discount)>
      //   this._serviceutility.calcularFinalPrice(b.price,b.offer.discount)
      //     ?-1 
      //     :1);
      return 0;
    });
  } 
}
