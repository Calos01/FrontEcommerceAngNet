import { Directive, HostListener, Input } from '@angular/core';
import { Categories } from '../models/models';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Directive({
  selector: '[appHeaderProduct]'
})
export class HeaderProductDirective {
  @Input() categoria:Categories={
    id: 0,
    category: '',
    subcategory: ''
  }
  @HostListener('click') abrirCategoria(){
    this.router.navigate(['/productops'],{queryParams:{
      category:this.categoria.category,
      subcategory:this.categoria.subcategory
    },
    })
  }
    constructor(private router:Router) { 
    } 
}


