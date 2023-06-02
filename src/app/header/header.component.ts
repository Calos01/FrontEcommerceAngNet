import { Component, ElementRef, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { HeaderCategories } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @ViewChild('modaltitle') modaltitle!: ElementRef
  @ViewChild('container',{read:ViewContainerRef, static:true}) container!:ViewContainerRef

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
  mostrarModal(name:string){
    this.container.clear()
    let namecomp!: Type<any>;
    if(name=='login'){
      namecomp=LoginComponent;
      this.modaltitle.nativeElement.textContent="Login de Usuario"
    } 
      
    if(name=='register') {
      namecomp=RegisterComponent;
      this.modaltitle.nativeElement.textContent="Registro de Usuario"
    }
    this.container.createComponent(namecomp)
  }
}
