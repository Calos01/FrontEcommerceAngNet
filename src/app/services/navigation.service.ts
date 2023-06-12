import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseurl='https://localhost:7086/api/Shopping/';
  constructor(private http:HttpClient) { }
  getListCategories(){
    let url=this.baseurl+'GetListCategories';
    return this.http.get<any[]>(url).pipe(map((categories)=>categories.map((category)=>{
      let categoriaMapeada: Category={
        id: category.id,
        category: category.category,
        subCategory: category.subCategory
      };
      return categoriaMapeada;
    })));
  }
  getProductos(category:string,subcategory:string,count:number){
    return this.http.get<any[]>(this.baseurl+'GetProductos',
    {params: new HttpParams().set('category',category).set('subcategory',subcategory).set('count',count)})
  }
  getProduct(id:number){
    return this.http.get<any>(this.baseurl+'GetProduct/'+id)
  }
}
