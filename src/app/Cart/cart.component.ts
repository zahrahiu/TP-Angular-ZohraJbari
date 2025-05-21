import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../Cart/cart.service'; // Vous devrez créer ce service
import { Product } from '../models/product.model'; // Adaptez selon votre modèle

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: {product: Product, quantity: number}[] = [];
  total = 0;

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 0
    );
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  updateQuantity(index: number, newQuantity: number) {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(index, newQuantity);
      this.calculateTotal();
    }
  }
}