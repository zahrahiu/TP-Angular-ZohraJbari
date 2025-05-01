import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../app/models/product.model';
import { CartService } from '../app/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId!: number;
  product?: Product;

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    if (this.productId) {
      this.CartService.getProductById(this.productId).subscribe(product => {
        this.product = product;
      });
    }
  }
  
}
