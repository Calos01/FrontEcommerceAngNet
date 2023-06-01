import { Component, Input, OnInit } from '@angular/core';
import { HeaderCategories } from '../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  itemcategories:HeaderCategories[]=[
    {
    categories:'Tecnology',
    subcategories:['celular', 'laptops']
    },
    {
      categories:'Tecnohogar',
      subcategories:['lavadora', 'refri']
    }
  ];
  ngOnInit(): void {
  }
}
