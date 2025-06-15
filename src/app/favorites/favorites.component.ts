import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      const favoriteIds: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.favoriteProducts = data.filter(p => favoriteIds.includes(p.id));
    });
  }

  removeFromFavorites(product: Product) {
    let favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(id => id !== product.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== product.id);
  }
}