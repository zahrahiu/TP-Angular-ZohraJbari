import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';

import { Product } from '../app/models/product.model';
import { CartService } from '../app/Cart/cart.service';
import { RatingService } from '../app/rating.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: string = '';

  product?: Product;
  similarByMarque: Product[] = [];
  similarByGenre: Product[] = [];

  stars = Array(5);
  currentRating = 0;
  clickedIndex: number | null = null;
  selectedVolumeIndex = 0;

  constructor(
    private cartService: CartService,
    private ratingSvc: RatingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.cartService.getProductById(id).subscribe(prod => {
        this.product = prod;
        if (!prod) return;

        this.currentRating = this.ratingSvc.get(prod.id);

        this.cartService.getProducts().subscribe(all => {
          this.similarByMarque = all
            .filter(p => p.id !== prod.id && p.marque === prod.marque)
            .slice(0, 8);

          this.similarByGenre = all
            .filter(p =>
              p.id !== prod.id &&
              p.genre === prod.genre &&
              p.marque !== prod.marque
            )
            .slice(0, 8);
        });
      });
    });
  }

  addToCart(p: Product) {
    if (!this.selectedVolume) {
      this.cartService.addToCart(p, 1);
    } else {
      this.cartService.addToCartWithVolume(p, this.selectedVolume, 1);
    }
    this.router.navigate(['/cart']);
  }

  goTo(p: Product) {
    this.router.navigate(['/products', p.id]);
  }

  get selectedVolume() {
    if (!this.product || !this.product.volumes || this.product.volumes.length === 0) {
      return null;
    }
    return this.product.volumes[this.selectedVolumeIndex];
  }

  rateProduct(stars: number) {
    if (!this.product) return;

    this.currentRating = stars;
    this.clickedIndex = stars - 1;
    setTimeout(() => (this.clickedIndex = null), 400);

    this.ratingSvc.set(this.product.id, stars);
  }
}
