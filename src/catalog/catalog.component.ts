import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Product } from '../app/models/product.model';
import { CartService } from '../app/Cart/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ProductDetailsComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.CartService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  


  toggleDetails(productId: number) {
    if (this.selectedProductId === productId) {
      this.selectedProductId = null;
    } else {
      this.selectedProductId = productId;
    }
  }

  getQuantity(product: Product): string {
    return product.isLowQuantity() ? 'low-quantity' : '';
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/images/default-product.jpg';
  }
}
