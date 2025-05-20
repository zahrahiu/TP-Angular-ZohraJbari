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
        apiProduct.id,
        apiProduct.name,
        apiProduct.description,
        // Supprimez le .replace() si le prix est déjà un nombre
        typeof apiProduct.price === 'string' 
          ? parseFloat(apiProduct.price.replace(' DH', '').trim())
          : apiProduct.price,
        apiProduct.quantity,
        apiProduct.imageUrl,
        apiProduct.category?.toLowerCase().trim() // Normalise la catégorie
      ));
    }),
    catchError(error => {
      console.error('Erreur:', error);
      return of([]);
    })
  );
}
  
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.baseUrl + '/featured').pipe(
      map(apiProducts => {
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
        console.error('Erreur lors de la récupération des produits en vedette:', error);
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
