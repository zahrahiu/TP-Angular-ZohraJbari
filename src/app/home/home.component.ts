import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../Cart/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  testimonials = [
    {name: 'Sarah', comment: 'Les parfums sont fabuleux, je recommande vivement!'},
    {name: 'Youssef', comment: 'Livraison rapide et service impeccable.'},
    {name: 'Nadia', comment: 'Qualité et senteurs exceptionnelles.'}
  ];

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getFeaturedProducts().subscribe(data => {
      this.featuredProducts = data;
    });
  }

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }

  goToCategory(category: string) {
    this.router.navigate(['/catalog'], { queryParams: { category } });
  }

  goToOffers() {
    this.router.navigate(['/offers']);
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product-details'], { queryParams: { id: productId } });
  }
}
