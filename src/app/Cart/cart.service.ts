import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(apiProducts => {
        console.log('Produits reçus:', apiProducts);
        return apiProducts.map(apiProduct => new Product(
          apiProduct.productID,
          apiProduct.productTitle,
          apiProduct.productDescription,
          parseFloat(apiProduct.productPrice.replace(' DH', '')),  
          apiProduct.quantity,
          apiProduct.productImage
        ));
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des produits:', error);
        return of([]);
      })
    );
  }
  
  

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }
}
