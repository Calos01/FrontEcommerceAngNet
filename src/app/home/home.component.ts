import { Component, Input } from '@angular/core';
import { ListaProducts } from '../models/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
@Input() listproduct:ListaProducts[] =[
  {bannerimage:'banner/banner-smartphone.png',
    categories:{
      id: 0,
      category: 'electronics',
      subCategory: 'mobiles',
    }
  },
  {bannerimage:'banner/banner-laptop.png',
    categories:{
      id: 1,
      category: 'electronics',
      subCategory: 'laptops',
    }
  },
  {bannerimage:'banner/banner-smartphone3.png',
    categories:{
      id: 1,
      category: 'furniture',
      subCategory: 'chairs',
    }
  }
]
}
