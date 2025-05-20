import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { routes } from './app.routes'; 

import { AppComponent } from './app.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartComponent } from './Cart/cart.component'; 
import { HomeComponent } from './home/home.component'; 
import { SigninComponent } from './signin/signin.component';

import { CartService } from './Cart/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ProductDetailsComponent,
    CartComponent,      
    HomeComponent,       
    SigninComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
