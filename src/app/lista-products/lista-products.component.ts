import { Component, Input, OnInit } from '@angular/core';
import { Categories } from '../models/models';

@Component({
  selector: 'app-lista-products',
  templateUrl: './lista-products.component.html',
  styleUrls: ['./lista-products.component.css']
})
export class ListaProductsComponent implements OnInit{
  @Input() categories: Categories={
    id: 0,
    category:'',
    subcategory:''
  };
  @Input() count:number=3;
  ngOnInit(): void {

  }

}
