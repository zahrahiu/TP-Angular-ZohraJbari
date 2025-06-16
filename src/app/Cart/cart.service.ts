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

  // تعديل: كل عنصر فيه حجم (volume) اختياري
  private items: {
    product: Product;
    volume?: { label: string; price: number; imageUrl?: string };
    quantity: number;
  }[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(apiProducts => {
        return apiProducts.map(apiProduct => new Product(
          apiProduct.id.toString(),
          apiProduct.name,
          apiProduct.description,
          typeof apiProduct.price === 'string'
            ? parseFloat(apiProduct.price.replace(' DH', '').trim())
            : apiProduct.price,
          apiProduct.quantity,
          apiProduct.imageUrl,
          apiProduct.category?.toLowerCase().trim(),
          apiProduct.hoverImageUrl,
          false,
          Number(apiProduct.discountPercentage) || 0,
          apiProduct.offerEndsInSeconds
            ? new Date(Date.now() + apiProduct.offerEndsInSeconds * 1000)
            : undefined,
          apiProduct.genre,
          apiProduct.marque,
          apiProduct.volumes // volumes ici
        ));
      }),
      catchError(error => {
        console.error('Erreur:', error);
        return of([]);
      })
    );
  }

  getSimilarProducts(ref: Product, max = 8): Observable<Product[]> {
    return this.getProducts().pipe(
      map(list =>
        list
          .filter(p =>
            p.id !== ref.id &&
            (p.genre === ref.genre || p.marque === ref.marque))
          .slice(0, max)
      )
    );
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id && !item.volume);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    product.quantity -= quantity;
  }

  addToCartWithVolume(product: Product, volume: { label: string; price: number; imageUrl?: string }, quantity: number = 1) {
    const existingItem = this.items.find(item =>
      item.product.id === product.id && item.volume?.label === volume.label
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, volume, quantity });
    }
    product.quantity -= quantity;
  }

  decreaseQuantity(productId: string) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      }
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  getItems() {
    return this.items;
  }

  updateQuantity(index: number, newQuantity: number) {
    const cartItem = this.items[index];
    const product = cartItem.product;
    const diff = newQuantity - cartItem.quantity;
    if (diff > 0) {
      if (product.quantity >= diff) {
        cartItem.quantity = newQuantity;
        product.quantity -= diff;
      } else {
        alert('Stock insuffisant !');
      }
    } else if (diff < 0) {
      cartItem.quantity = newQuantity;
      product.quantity += Math.abs(diff);
    }
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }
}
