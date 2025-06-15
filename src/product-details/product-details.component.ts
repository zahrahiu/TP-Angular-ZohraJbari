import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../app/models/product.model';
import { CartService } from '../app/Cart/cart.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: string = '';
  product?: Product;

  constructor(
  private cartService: CartService,
  private router: Router,
  private route: ActivatedRoute
) {}

 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cartService.getProductById(id).subscribe(product => {
          this.product = product;
        });
      }
    });
  }

 addToCart(product: Product) {
  this.cartService.addToCart(product);

  this.router.navigate(['/cart']);
}

  
}
