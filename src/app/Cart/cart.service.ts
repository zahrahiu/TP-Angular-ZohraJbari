import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product, Volume } from '../models/product.model';
import { CartItem } from './cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3000/api/products';

  /* ------------ état local ------------ */
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);
  private productStocks = new Map<string, BehaviorSubject<number>>();

  constructor(private http: HttpClient) {
    this.initProductStocks();
  }

  /* ------------ récupérer produits ------------ */
  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(api =>
        api.map(
          p =>
            new Product(
              p.id.toString(),
              p.name,
              p.description,
              typeof p.price === 'string'
                ? parseFloat(p.price.replace(' DH', '').trim())
                : p.price,
              p.quantity,
              p.imageUrl,
              p.category?.toLowerCase().trim(),
              p.hoverImageUrl,
              false,
              Number(p.discountPercentage) || 0,
              p.offerEndsInSeconds
                ? new Date(Date.now() + p.offerEndsInSeconds * 1000)
                : undefined,
              p.genre,
              p.marque,
              p.volumes,
              p.ingredientsImageUrl
            )
        )
      ),
      catchError(err => {
        console.error('Erreur:', err);
        return of([]);
      })
    );
  }

  /* ------------ stock ------------ */
  private initProductStocks() {
    this.getProducts().subscribe(products => {
      products.forEach(p => {
        if (!this.productStocks.has(p.id)) {
          this.productStocks.set(p.id, new BehaviorSubject<number>(p.quantity));
        }
      });
    });
  }

  getProductStock$(productId: string): Observable<number> {
    if (!this.productStocks.has(productId)) {
      this.productStocks.set(productId, new BehaviorSubject<number>(0));
    }
    return this.productStocks.get(productId)!.asObservable();
  }

  private decreaseStock(id: string, q: number) {
    if (!this.productStocks.has(id)) {
      this.productStocks.set(id, new BehaviorSubject<number>(0));
    }
    const s = this.productStocks.get(id)!;
    s.next(Math.max(0, s.getValue() - q));
  }

  private increaseStock(id: string, q: number) {
    if (!this.productStocks.has(id)) {
      this.productStocks.set(id, new BehaviorSubject<number>(0));
    }
    const s = this.productStocks.get(id)!;
    s.next(s.getValue() + q);
  }


  /* ------------ helpers ------------ */
  private computePrice(prod: Product, vol?: Volume): number {
    const base = vol ? vol.price : prod.price;
    return prod.isOnSale()
      ? Math.round(base * (1 - prod.discountPercentage / 100))
      : base;
  }

  private price(prod: Product, vol?: Volume) {
    const base = vol ? vol.price : prod.price;
    return prod.isOnSale()
      ? Math.round(base * (1 - prod.discountPercentage / 100))
      : base;
  }


  /* ------------ panier ------------ */
  addToCart(prod: Product, qty = 1, vol?: Volume) {
    const key = vol ? `${prod.id}_${vol.label}` : prod.id;
    const line = this.items.find(i => i.key === key);

    if (line) {
      this.updateQuantity(key, line.quantity + qty);
    } else {
      this.items.push({
        key,
        productId: prod.id,
        name: prod.name,
        imageUrl: prod.imageUrl,
        volumeLabel: vol?.label,
        unitPrice: this.price(prod, vol),
        quantity: qty
      });
      this.decreaseStock(prod.id, qty);
      this.items$.next([...this.items]);
    }
  }


  addToCartWithVolume(prod: Product, vol: Volume, qty = 1) {
    this.addToCart(prod, qty, vol);
  }

  getItems() {
    return this.items$.asObservable();
  }

  /* ---- +1 ---- */
  incrementQuantity(key: string) {
    const it = this.items.find(i => i.key === key);
    if (!it) return;

    if ((this.productStocks.get(it.productId)?.getValue() || 0) <= 0) {
      throw new Error('Stock insuffisant');
    }

    this.decreaseStock(it.productId, 1);
    it.quantity++;
    this.items$.next([...this.items]);
  }

  decreaseQuantity(key: string) {
    const it = this.items.find(i => i.key === key);
    if (!it) return;

    it.quantity--;
    if (it.quantity <= 0) {
      this.removeItem(key);
    } else {
      this.increaseStock(it.productId, 1);
      this.items$.next([...this.items]);
    }
  }

  removeItem(key: string) {
    const idx = this.items.findIndex(i => i.key === key);
    if (idx === -1) return;

    const it = this.items[idx];
    this.increaseStock(it.productId, it.quantity);
    this.items.splice(idx, 1);
    this.items$.next([...this.items]);
  }

  clearCart() {
    this.items.forEach(item =>
      this.increaseStock(item.productId, item.quantity)
    );
    this.items = [];
    this.items$.next([]);
  }

  /* ---- mise à jour directe ---- */
  updateQuantity(key: string, newQty: number) {
    const item = this.items.find(i => i.key === key);
    if (!item) return;

    const diff = newQty - item.quantity;

    if (diff > 0) {
      const currentStock =
        this.productStocks.get(item.productId)?.getValue() || 0;
      if (diff > currentStock) {
        throw new Error('Stock insuffisant');
      }
      this.decreaseStock(item.productId, diff);
    } else if (diff < 0) {
      this.increaseStock(item.productId, -diff);
    }

    item.quantity = newQty;
    this.items$.next([...this.items]);
  }

  /* ------------ util ------------ */
  getProductById(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(list => list.find(p => p.id === id))
    );
  }
   finalizeOrder() {
    this.items = [];
    this.items$.next([]);
  }
  
}
