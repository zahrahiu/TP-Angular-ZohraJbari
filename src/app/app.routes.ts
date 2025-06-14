import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent} from '../catalog/catalog.component';
import { CartComponent } from './Cart/cart.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    
    {path : 'home', component : HomeComponent, title: 'My Home'},
    {path : 'catalog', component : CatalogComponent, title: 'My Catalog products'},
    {path : 'product-details', component : ProductDetailsComponent, title: 'Product details'},
    {path : 'cart', component : CartComponent, title: 'My cart'},
    {path : 'signin', component : SigninComponent, title: 'My signin page'},
        {path : 'signup', component : SignupComponent, title: 'My signup page'},
    {path : '', redirectTo : '/home', pathMatch : 'full'},
    
    
    

];
