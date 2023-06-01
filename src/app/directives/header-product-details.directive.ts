import { Directive, HostListener, Input } from '@angular/core';
import { Categories } from '../models/models';
import { Router } from '@angular/router';

@Directive({
  selector: '[appHeaderProductDetails]'
})
export class HeaderProductDetailsDirective {
  @Input() prodid: number=0;
  @HostListener('click') mostraprod(){
    window.scrollTo(0,0);
    this.router.navigate(['/product-details'],{
      queryParams:{
      id:this.prodid
      },
    })
  }
  constructor(private router:Router) { }

}
