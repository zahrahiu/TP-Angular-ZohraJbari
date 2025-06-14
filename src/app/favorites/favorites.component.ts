import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUserCredentials } from '../models/User';
import { Product } from '../models/product.model';
import { CartService } from '../Cart/cart.service';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteProducts: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      const products = data.map(item => new Product(
        item.id, item.name, item.description,
        item.price, item.quantity, item.imageUrl,
        item.category, item.hoverImageUrl
      ));

      const favoriteIds: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.favoriteProducts = products.filter(p => favoriteIds.includes(p.id));
    });
  }
  removeFromFavorites(product: Product) {
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter(id => id !== product.id);
  localStorage.setItem('favorites', JSON.stringify(favorites));


  this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== product.id);
}

}
