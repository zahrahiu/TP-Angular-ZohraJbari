import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private KEY = 'product_ratings';      // map {id: note}

  get(id: string): number {
    const map = JSON.parse(localStorage.getItem(this.KEY) || '{}');
    return map[id] || 0;
  }

  set(id: string, stars: number): void {
    const map = JSON.parse(localStorage.getItem(this.KEY) || '{}');
    map[id] = stars;
    localStorage.setItem(this.KEY, JSON.stringify(map));
  }
}
