import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.model';
import { CartService } from '../Cart/cart.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteProducts: Product[] = [];
  hoveredProductId: string | null = null;

  // timer ⏳
  countdowns: { [id: string]: string } = {};
  private timerSub?: Subscription;

  private isBrowser: boolean;

  constructor(
    private cartService: CartService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /* ---------- Life‑cycle ---------- */
  ngOnInit(): void {
    const favIds: string[] = this.getFavoritesIds();

    // récupère les produits depuis l’API puis filtre
    this.cartService.getProducts().subscribe((all) => {
      this.favoriteProducts = all.filter((p) => favIds.includes(p.id));
      this.startCountdown();
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  /* ---------- Timer ---------- */
  private startCountdown() {
    this.timerSub = interval(1000).subscribe(() => {
      const now = Date.now();
      this.favoriteProducts.forEach((p) => {
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
          // offre expirée → on cache timer & badge
          p.discountPercentage = 0;
          delete this.countdowns[p.id];
        }
      });
    });
  }

  /* ---------- Favoris ---------- */
  removeFromFavorites(product: Product): void {
    product.isFavorite = false;
    let fav = this.getFavoritesIds().filter((id) => id !== product.id);
    this.saveFavoritesIds(fav);
    this.favoriteProducts = this.favoriteProducts.filter((p) => p.id !== product.id);
  }

  private getFavoritesIds(): string[] {
    if (!this.isBrowser) return [];
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  private saveFavoritesIds(ids: string[]) {
    if (this.isBrowser) {
      localStorage.setItem('favorites', JSON.stringify(ids));
    }
  }

  /* ---------- Helpers ---------- */
  trackByProductId(_: number, p: Product) {
    return p.id;
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/images/default-product.jpg';
  }
}
