import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Product } from '../app/models/product.model';
import { CartService } from '../app/Cart/cart.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ProductDetailsComponent,
    RouterModule 
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  hoveredProductId: number | null = null;

  selectedProductId: number | null = null;
  activeFilter: string = 'all';

  constructor(
    private CartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.CartService.getProducts().subscribe(data => {
      this.products = data.map(item => new Product(
        item.id,
        item.name,
        item.description,
        item.price,
        item.quantity,
        item.imageUrl,
        item.category,
        item.hoverImageUrl
      ));
      this.filteredProducts = [...this.products];
    });
    this.loadFavorites();


    // Écoute les changements de paramètres d'URL
    this.route.queryParams.subscribe(params => {
      this.activeFilter = params['filter'] || 'all';
      this.applyFilter(this.activeFilter);
    });
  }

  applyFilter(filter: string) {
  this.activeFilter = filter;
  if (filter === 'all') {
    this.filteredProducts = [...this.products];
  } else {
    this.filteredProducts = this.products.filter(product => 
      product.category?.toLowerCase() === filter.toLowerCase()
    );
  }
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

  onMouseEnter(product: Product, event: Event) {
    const target = event.target as HTMLImageElement;
    if (product.hoverImageUrl) {
      target.src = product.hoverImageUrl;
    }
  }

  onMouseLeave(product: Product, event: Event) {
    const target = event.target as HTMLImageElement;
    if (product.imageUrl) {
      target.src = product.imageUrl;
    }
  }
  toggleFavorite(product: Product) {
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.indexOf(product.id);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(product.id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

isFavorite(productId: number): boolean {
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(productId);
}

saveFavorites() {
  const favoriteIds = this.products.filter(p => p.isFavorite).map(p => p.id);
  localStorage.setItem('favorites', JSON.stringify(favoriteIds));
}

loadFavorites() {
  const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  this.products.forEach(p => {
    p.isFavorite = favoriteIds.includes(p.id);
  });
}


  searchTerm: string = '';

  filterProducts() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

  
}
