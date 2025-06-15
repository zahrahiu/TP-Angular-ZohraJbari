import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartService } from '../app/Cart/cart.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../app/models/product.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDetailsComponent, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  hoveredProductId: string | null = null;
  selectedProductId: string | null = null;
  activeFilter = 'all';
 countdowns: { [id: string]: string } = {};
  private timerSub?: Subscription;  searchTerm = '';
  private isBrowser: boolean;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      this.products = data;
      
      this.filteredProducts = [...this.products];
      this.loadFavorites();
      this.startCountdown(); 
      

      
    });

    this.route.queryParams.subscribe(params => {
      this.applyFilter(params['filter'] || 'all');
    });
  }

  private startCountdown() {
    this.timerSub = interval(1000).subscribe(() => {
      const now = Date.now();
      this.products.forEach(p => {
        if (p.offerEndsAt && p.offerEndsAt.getTime() > now) {
          const diff = p.offerEndsAt.getTime() - now;
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          this.countdowns[p.id] =
            `${h.toString().padStart(2, '0')}:` +
            `${m.toString().padStart(2, '0')}:` +
            `${s.toString().padStart(2, '0')}`;
        } else {
          // offre salat
          p.discountPercentage = 0;
          delete this.countdowns[p.id];
        }
      });
    });}

ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }
  

  private getFavorites(): string[] {
    if (!this.isBrowser) return [];
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  private saveFavorites(favorites: string[]): void {
    if (this.isBrowser) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

 

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

 applyFilter(filter: string): void {
  this.activeFilter = filter;

  switch (filter) {
    case 'all':
      this.filteredProducts = [...this.products];
      break;

    case 'promo':
      this.filteredProducts = this.products.filter(p => p.isOnSale());
      break;

    default:
      this.filteredProducts = this.products.filter(p => p.category === filter);
  }
}



  toggleDetails(id: string): void {
    this.selectedProductId = this.selectedProductId === id ? null : id;
  }

  toggleFavorite(product: Product): void {
    const fav = this.getFavorites();
    const idx = fav.indexOf(product.id);
    if (idx > -1) {
      fav.splice(idx, 1);
      product.isFavorite = false;
    } else {
      fav.push(product.id);
      product.isFavorite = true;
    }
    this.saveFavorites(fav);
  }

  isFavorite(id: string): boolean {
    if (!this.isBrowser) return false;
    return this.getFavorites().includes(id);
  }

  loadFavorites(): void {
    const fav = this.getFavorites();
    this.products.forEach(p => p.isFavorite = fav.includes(p.id));
  }

  filterProducts(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/default-product.jpg';
  }
}