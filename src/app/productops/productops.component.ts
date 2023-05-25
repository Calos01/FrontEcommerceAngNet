import { Component } from '@angular/core';

@Component({
  selector: 'app-productops',
  templateUrl: './productops.component.html',
  styleUrls: ['./productops.component.css']
})
export class ProductopsComponent {
view: 'grid'|'list'='list'
sortby: 'default'|'lth'|'htl'='default'
}
