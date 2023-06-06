import { HttpClient } from '@angular/common/http';
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
}
