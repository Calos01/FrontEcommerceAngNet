import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ListaProductsComponent } from './lista-products/lista-products.component';
import { HomeComponent } from './home/home.component';
import { ProductopsComponent } from './productops/productops.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderProductDirective } from './directives/header-product.directive';
import { HeaderProductDetailsDirective } from './directives/header-product-details.directive';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import { UserpruebaComponent } from './userprueba/userprueba.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ListaProductsComponent,
    HomeComponent,
    ProductopsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HeaderProductDirective,
    HeaderProductDetailsDirective,
    LoginComponent,
    RegisterComponent,
    UserpruebaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return localStorage.getItem('user');
        },
        allowedDomains:['localhost:7086']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
