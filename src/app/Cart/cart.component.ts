import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../Cart/cart.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: { product: Product, quantity: number }[] = [];
  total = 0;
  showConfirmForm = false;
  showPaymentOptions = false;
  userName = '';
  userNumber = '';

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
    const productId = this.cartItems[index].product.id;
    this.cartService.removeItem(productId); // Envoie l'ID string
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  updateQuantity(index: number, newQuantity: number) {
    if (newQuantity > 0) {
      const currentItem = this.cartItems[index];
      const availableStock = currentItem.product.quantity;
      const quantityDiff = newQuantity - currentItem.quantity;

      if (quantityDiff > 0 && availableStock >= quantityDiff) {
        this.cartService.updateQuantity(index, newQuantity);
        this.calculateTotal();
      } else if (quantityDiff < 0) {
        this.cartService.updateQuantity(index, newQuantity);
        this.calculateTotal();
      }
    }
  }

  confirmerCommande() {
    alert(`Commande confirmée pour ${this.userName} (ID: ${this.userNumber}) avec un total de ${this.total} MAD.`);
    this.showConfirmForm = false;
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotal();
    this.showPaymentOptions = true;
    this.userName = '';
    this.userNumber = '';
  }

  payerAvec(methode: string) {
    this.showPaymentOptions = false;
    alert('Méthode choisie: ' + methode); 
  }
}