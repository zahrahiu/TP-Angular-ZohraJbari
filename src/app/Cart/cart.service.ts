import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [
    new Product(
      1,
      'Coco Chanel Mademoiselle',
      'Un parfum élégant avec des notes florales et fruitées. Parfait pour une soirée chic.',
      120.00,
      15,
      'assets/images/coco chanel.jpg'
    ),
    new Product(
      2,
      'Miss Dior Blooming Bouquet',
      'Un parfum frais et floral, inspiré de la rose et du pivoine, parfait pour la journée.',
      85.99,
      20,
      'assets/images/miss dior.jpg'
    ),
    new Product(
      3,
      'Prada Candy',
      'Parfum sucré et oriental, avec des notes de caramel, vanille et musc.',
      75.00,
      10,
      'assets/images/prada.jpg'
    ),
    new Product(
      4,
      'Kayali Vanilla 28',
      'Un parfum chaud et doux avec des notes de vanille, musc et bois précieux.',
      95.00,
      8,
      'assets/images/kayali vanilla 28.jpg'
    ),
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products.filter(product => product.quantity > 0);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
