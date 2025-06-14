import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../Cart/cart.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: { product: Product, quantity: number }[] = [];
  total = 0;

  

  showConfirmForm = false;
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
    this.cartService.removeItem(index);
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
    // Ici tu peux faire ce que tu veux : envoyer la commande à un serveur, 
    // afficher un message de succès, vider le panier, etc.
    alert(`Commande confirmée pour ${this.userName} (ID: ${this.userNumber}) avec un total de ${this.total} MAD.`);
    this.showConfirmForm = false;

    // Exemple : vider le panier après confirmation
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotal();
this.showConfirmForm = false;
  this.showPaymentOptions = true;
    // Réinitialiser le formulaire
    this.userName = '';
    this.userNumber = '';
  }

  showPaymentOptions = false;


payerAvec(methode: string) {
  this.showPaymentOptions = false;
  alert('Méthode choisie: ' + methode); // ici tu peux rediriger ou envoyer vers une vraie page de paiement
}

}
