import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.model';
import { RouterModule } from '@angular/router';
type CartGroup = {
  productId: string;
  name: string;
  imageUrl?: string;
  lines: CartItem[];
};

type PackagingOption = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

type OrderInfo = {
  name: string;
  phone: string;
  paymentMethod: string;
   withPackaging: boolean;
  packagingId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  address?: string;       
};

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartGroups: CartGroup[] = [];
  showOrderForm = false;

   packagingOptions: PackagingOption[] = [
    { id: 'pk40', name: 'Écrin Ruban Rouge', price: 40, imageUrl: '/assets/images/emb1.jpg' },
    { id: 'pk35', name: 'Boîte Florale',     price: 35, imageUrl: '/assets/images/emb2.jpg' },
    { id: 'pk27', name: 'Tissu Velours',     price: 27, imageUrl: '/assets/images/emb3.jpg' },
    { id: 'pk25', name: 'Coffret Luxe Or',   price: 25, imageUrl: '/assets/images/emb4.jpg' },
    { id: 'pk20', name: 'Coffret Luxe Or',   price: 20, imageUrl: '/assets/images/emb5.jpg' },
    { id: 'pk30', name: 'Coffret Luxe Or',   price: 30, imageUrl: '/assets/images/emb6.jpg' },
    { id: 'pk10', name: 'Coffret Luxe Or',   price: 10, imageUrl: '/assets/images/emb7.jpg' },
    { id: 'pk15', name: 'Coffret Luxe Or',   price: 15, imageUrl: '/assets/images/emb8.jpg' },
    { id: 'pk05', name: 'Coffret Luxe Or',   price: 5, imageUrl: '/assets/images/emb9.jpg' },

  ];

  orderInfo: OrderInfo = {
    name: '',
    phone: '',
    paymentMethod: 'cash',
    withPackaging: false,
  };

  constructor(private cartSvc: CartService) {}

  /* ----------------- life‑cycle ----------------- */
  ngOnInit() {
    this.cartSvc.getItems().subscribe((items) => {
      this.cartGroups = this.groupByProduct(items);
    });
  }

  ngOnDestroy() {
 
  }

  inc(l: CartItem) {
    this.cartSvc.incrementQuantity(l.key);
  }
  dec(l: CartItem) {
    this.cartSvc.decreaseQuantity(l.key);
  }
  remove(l: CartItem) {
    this.cartSvc.removeItem(l.key);
  }
  getStock(id: string) {
    return this.cartSvc.getProductStock$(id);
  }

  private groupByProduct(items: CartItem[]) {
    const map = new Map<string, CartGroup>();
    items.forEach((it) => {
      if (!map.has(it.productId)) {
        map.set(it.productId, {
          productId: it.productId,
          name: it.name,
          imageUrl: it.imageUrl,
          lines: [],
        });
      }
      map.get(it.productId)!.lines.push(it);
    });
    return Array.from(map.values());
  }

  getGroupTotal(g: CartGroup) {
    return g.lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  }

  private getPackagingCost(): number {
  if (!this.orderInfo.withPackaging) return 0;
  const pack = this.packagingOptions.find(p => p.id === this.orderInfo.packagingId);
  return pack ? pack.price : 0;
}

  getTotal(): number {
  const produits = this.cartGroups.reduce((s, g) => s + this.getGroupTotal(g), 0);
  return produits + this.getPackagingCost();
}


  submitOrder() {
  const fullOrder = {
    userInfo: this.orderInfo,
    packagingCost: this.getPackagingCost(),
    total: this.getTotal(),
    items: this.cartGroups.flatMap(g => g.lines),
    status: 'en cours', 
    createdAt: new Date()
  };

  localStorage.setItem('lastOrder', JSON.stringify(fullOrder));

  this.cartSvc.finalizeOrder();
  this.showOrderForm = false;

  window.location.href = '/order-details';
}


}
