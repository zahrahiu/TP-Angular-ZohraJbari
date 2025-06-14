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
import { SignupComponent } from './signup/signup.component';
import { CartService } from './Cart/cart.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HttpClientModule,
    AppComponent,
    CatalogComponent,
    ProductDetailsComponent,
    CartComponent,      
    HomeComponent,       
    SigninComponent,
     SignupComponent  
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
