import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  //para mostrar vista de forma grid o list
  @Input() view: 'grid'|'list'|'cartitem'|'prevcartitem'='grid';

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  

}
