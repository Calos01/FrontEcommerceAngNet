import { Component, ElementRef, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, HeaderCategories } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @ViewChild('modaltitle') modaltitle!: ElementRef
  @ViewChild('container',{read:ViewContainerRef, static:true}) container!:ViewContainerRef
  /**
   *
   */
  constructor(private _serviceNavigation:NavigationService, public serviceUtility:UtilityService) {    
  }
  itemcategories:HeaderCategories[]=[
    // {
    // categories:'Tecnology',
    // subcategories:['celular', 'laptops']
    // },
    // {
    //   categories:'Tecnohogar',
    //   subcategories:['lavadora', 'refri']
    // }
  ];
  nroItem:number=0;
  ngOnInit(): void {
    //Mostrar Select de Categories
    this._serviceNavigation.getListCategories().subscribe((list:Category[])=>{
      for(let item of list){
        let noterminado=false;

        //SEGUNDO UNA VEZ QUE JALE TODO EL JSON lo que va hacer el for es agregar las subcategorias si es que los category son iguales
        for(let itemNav of this.itemcategories){
          //literal va comparar entre los mismos json(revisar la api ya que no hay un array de category ni subcategories son datos repetidos por eso lo hacemos asi)
          if(itemNav.categories==item.category){
            itemNav.subcategories.push(item.subCategory);
            //con esto finalizaria para que no entre al if
            noterminado=true;
          }
        }

        //PRIMERO va entrar a este if, el fin de esto es traer todo el json que manda la api tal como esta
        if(!noterminado){
          this.itemcategories.push({
            categories:item.category,
            subcategories:[item.subCategory]
          })
        }
      }
    });

    //Igual contador del carrito con el nro de items o productos agragados
    if(this.serviceUtility.estaLogeado()){
      this._serviceNavigation.getCartActive(this.serviceUtility.getUser().userId).subscribe((dat:any)=>{
        this.nroItem=dat.cartItems.length;
      });
    }
    
    /**
   * *Jalamos el objeto changenroItem quien es nuestro subject se sumara cada vez que den click en Addcart
   * ?cada vez que hacen click con el .next me envia 1
   */
    this.serviceUtility.changenroItem.subscribe((res:any)=>{
      this.nroItem += parseInt(res);
    })
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
