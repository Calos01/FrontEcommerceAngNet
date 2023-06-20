import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, PaymentMethod, User } from '../models/models';
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
  registerUser(user:User){
    let url=this.baseurl+'RegisterUser';
    return this.http.post(url,user,{responseType:'text'})
  }
  loginUser(email:string,pass:string){
    return this.http.post(this.baseurl+'LoginUser',{Email:email,Password:pass},{responseType:'text'})
  }
  submitReview(userid:number,productid:number,review:string){
    let url=this.baseurl+'InsertReview';
    let usuario:any={
      User:{
        userId:userid
      },
      Product:{
        id:productid
      },
      review:review
    }
    return this.http.post(url,usuario,{responseType:'text'})
  }

  listreview(prodid:number){
    let url=this.baseurl+"GetReviews/"+prodid;
    return this.http.get<any[]>(url);
  }

  addCart(userid:number, productid:number){
    let url=this.baseurl+'InsertCartItem/'+userid+'/'+productid;
    return this.http.post(url,null,{responseType:'text'});
  }

  //carrito por usuario
  getCartActive(userid:number){
    let url=this.baseurl+'GetCartActivoPorUser/'+userid;
    return this.http.get(url);
  }

  //previous CartItems
  getPreviousCart(userid:number){
    let url=this.baseurl+"GetPreviousCart/"+userid;
    return this.http.get(url);
  }

  //getPaymentMethods
  getPaymentMethods(payid:number){
    let url=this.baseurl+"GetPaymentMethods/"+payid;
    return this.http.get<PaymentMethod[]>(url);
  }
}
