import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-root',
  
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tpAngular';
  favoriteProductIds: Set<number> = new Set();

  isFavorite(productId: number): boolean {
    return this.favoriteProductIds.has(productId);
  }

  toggleFavorite(product: any): void {
    if (this.isFavorite(product.id)) {
      this.favoriteProductIds.delete(product.id);
    } else {
      this.favoriteProductIds.add(product.id);
    }
  }
}
