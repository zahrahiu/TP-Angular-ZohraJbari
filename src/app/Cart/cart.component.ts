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

type CartGroup = {
  productId: string;
  name: string;
  imageUrl?: string;
  lines: CartItem[];
};

type OrderInfo = {
  name: string;
  phone: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  address?: string;       
};

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartGroups: CartGroup[] = [];
  showOrderForm = false;

  orderInfo: OrderInfo = {
    name: '',
    phone: '',
    paymentMethod: 'cash',
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
  getTotal() {
    return this.cartGroups.reduce((s, g) => s + this.getGroupTotal(g), 0);
  }

  submitOrder() {
  const fullOrder = {
    userInfo: this.orderInfo,
    total: this.getTotal(),
    items: this.cartGroups.flatMap(g => g.lines),
    status: 'en cours', // الحالة المبدئية
    createdAt: new Date()
  };

  localStorage.setItem('lastOrder', JSON.stringify(fullOrder));

  this.cartSvc.finalizeOrder();
  this.showOrderForm = false;

  window.location.href = '/order-details';
}


}
