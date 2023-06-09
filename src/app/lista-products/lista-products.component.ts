import { Component, Input, OnInit } from '@angular/core';
import { Categories, Product } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-lista-products',
  templateUrl: './lista-products.component.html',
  styleUrls: ['./lista-products.component.css']
})
export class ListaProductsComponent implements OnInit{
  //Este categories lo envia el home xd
  @Input() categories: Categories={
    id: 0,
    category:'',
    subcategory:''
  };
  @Input() count:number=3;
  products: Product[]=[];

  constructor(private _serviceNavigation:NavigationService) {
    
  }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this._serviceNavigation.getProductos(this.categories.category,this.categories.subcategory,this.count).subscribe((res: any[])=>{
      for(let product of res){
        this.products.push(product)
      }
    })
  }
}
