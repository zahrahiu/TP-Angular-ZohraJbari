import {
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Product } from '../app/models/product.model';
import { CartService } from '../app/Cart/cart.service';
import { RatingService } from '../app/rating.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @Input() productId: string = '';
  product?: Product;
  similarByMarque: Product[] = [];
  similarByGenre: Product[] = [];
  currentImg = '/assets/images/default-product.jpg';
  selectedVolumeIndex = 0;
  stars = Array(5);
  currentRating = 0;
  countdown: string | null = null;
  selectedQuantity = 1;
  cartQuantity = 0;

  private timerSub?: Subscription;
  private cartSub?: Subscription;
  private stockSub?: Subscription;

  constructor(
    private cartSvc: CartService,
    private ratingSvc: RatingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idFromInput = this.productId;
    if (idFromInput) {
      this.loadProduct(idFromInput);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) this.loadProduct(id);
      });
    }
  }

  private loadProduct(id: string) {
    this.cartSvc.getProductById(id).subscribe(prod => {
      this.product = prod;
      if (!prod) return;

      if (prod.offerEndsAt && typeof prod.offerEndsAt === 'string') {
        prod.offerEndsAt = new Date(prod.offerEndsAt);
      }

      if (prod.offerEndsAt && prod.isOnSale()) {
        this.startCountdown(prod.offerEndsAt);
      }

      this.currentImg = prod.imageUrl || this.currentImg;
      if (prod.volumes?.length) {
        this.currentImg = prod.volumes[0].imageUrl || this.currentImg;
      }
      this.currentRating = this.ratingSvc.get(prod.id);

      // S'abonner aux changements de stock
      this.stockSub = this.cartSvc.getProductStock$(id).subscribe(qty => {
        if (this.product) {
          this.product.quantity = qty;
        }
      });

      this.cartSvc.getProducts().subscribe(all => {
        this.similarByMarque = all
          .filter(p => p.id !== prod.id && p.marque === prod.marque)
          .slice(0, 8);

        this.similarByGenre = all
          .filter(p => p.id !== prod.id && p.genre === prod.genre && p.marque !== prod.marque)
          .slice(0, 8);
      });

      this.updateCartQuantity(prod);
    });
  }

  private updateCartQuantity(prod: Product) {
    this.cartSub?.unsubscribe();
    this.cartSub = this.cartSvc.getItems().subscribe(items => {
      const key = this.selectedVolume 
        ? `${prod.id}_${this.selectedVolume.label}` 
        : prod.id;
      const item = items.find(i => i.key === key);
      this.cartQuantity = item ? item.quantity : 0;
    });
  }

  private startCountdown(date: Date) {
    this.timerSub?.unsubscribe();
    this.timerSub = interval(1000).subscribe(() => {
      const diff = date.getTime() - Date.now();
      if (diff <= 0) {
        this.countdown = null;
        if (this.product) this.product.discountPercentage = 0;
        this.timerSub?.unsubscribe();
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      this.countdown = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    });
  }

  get selectedVolume() {
    return this.product?.volumes?.length 
      ? this.product.volumes[this.selectedVolumeIndex] 
      : null;
  }

  selectVolume(i: number, img?: string) {
    this.selectedVolumeIndex = i;
    if (img) this.currentImg = img;
    if (this.product) this.updateCartQuantity(this.product);
  }

  setCurrentImage(url: string) {
    this.currentImg = url;
  }

  rateProduct(stars: number) {
    if (!this.product) return;
    this.currentRating = stars;
    this.ratingSvc.set(this.product.id, stars);
  }

  addToCart(p: Product) {
    if (!p || this.selectedQuantity <= 0) {
      alert('Veuillez sélectionner une quantité valide.');
      return;
    }

    if (p.quantity < this.selectedQuantity) {
      alert('Quantité insuffisante en stock.');
      return;
    }

    if (this.selectedVolume) {
      this.cartSvc.addToCartWithVolume(p, this.selectedVolume, this.selectedQuantity);
    } else {
      this.cartSvc.addToCart(p, this.selectedQuantity);
    }

    this.selectedQuantity = 1;
    this.router.navigate(['/cart']);
  }

  goTo(p: Product) {
    this.router.navigate(['/product', p.id]);
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
    this.cartSub?.unsubscribe();
    this.stockSub?.unsubscribe();
  }
}