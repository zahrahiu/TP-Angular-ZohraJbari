import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../Cart/cart.service';
import { Product } from '../models/product.model';

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

  paymentMethod: 'cash' | 'card' | '' = '';
  cardCode = '';

  latitude: number | null = null;
  longitude: number | null = null;
  locationError: string | null = null;

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
    this.cartService.removeItem(productId);
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

  toggleConfirmForm() {
    this.showConfirmForm = !this.showConfirmForm;
    this.showPaymentOptions = false;
  }

  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.locationError = null;
        },
        (error) => {
          this.locationError = "Impossible d'obtenir la localisation.";
          this.latitude = null;
          this.longitude = null;
        }
      );
    } else {
      this.locationError = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
  }

  confirmerCommande() {
    if (!this.userName.trim() || !this.userNumber.trim() || this.total <= 0) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (!this.paymentMethod) {
      alert('Veuillez choisir une méthode de paiement.');
      return;
    }

    if (this.paymentMethod === 'card' && this.cardCode.trim().length < 4) {
      alert('Veuillez saisir un code de carte valide (au moins 4 caractères).');
      return;
    }

    this.getLocation();

    alert(`Commande confirmée pour ${this.userName} (ID: ${this.userNumber})
Total: ${this.total} MAD
Méthode paiement: ${this.paymentMethod}
Localisation: ${this.latitude ?? 'non disponible'}, ${this.longitude ?? 'non disponible'}`);

    this.showConfirmForm = false;
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotal();

    // Reset formulaire
    this.userName = '';
    this.userNumber = '';
    this.paymentMethod = '';
    this.cardCode = '';
    this.latitude = null;
    this.longitude = null;
    this.locationError = null;
  }

  payerAvec(methode: string) {
    alert('Méthode choisie: ' + methode);
  }
}