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
  private items: {product: Product, quantity: number}[] = [];

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

addToCart(product: Product, quantity: number = 1) {
  // Vérifier si stock kafi
  if (product.quantity < quantity) {
    alert('Stock insuffisant!');
    return;
  }

  const existingItem = this.items.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ product, quantity });
  }

  // Décrémente stock
  product.quantity -= quantity;
}


  decreaseQuantity(productId: number) {
  const item = this.items.find(i => i.product.id === productId);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      this.removeItem(productId);
    }
  }
}

removeItem(productId: number) {
  this.items = this.items.filter(item => item.product.id !== productId);
}


  getItems() {
    return this.items;
  }

  

  updateQuantity(index: number, newQuantity: number) {
    this.items[index].quantity = newQuantity;
  }

  clearCart() {
    this.items = [];
    return this.items;
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
