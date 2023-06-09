import { Component, Input } from '@angular/core';
import { ListaProducts } from '../models/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
@Input() listproduct:ListaProducts[] =[
  {bannerimage:'banner/laptops.webp',
    categories:{
      id: 0,
      category: 'electronics',
      subcategory: 'mobiles',
    }
  },
  {bannerimage:'banner/celulares.jfif',
    categories:{
      id: 1,
      category: 'electronics',
      subcategory: 'laptops',
    }
  },
  {bannerimage:'banner/celulares.jfif',
    categories:{
      id: 1,
      category: 'furniture',
      subcategory: 'chairs',
    }
  }
]
}
