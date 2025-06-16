import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private KEY = 'product_ratings';      // map {id: note}

  /** récupérer la note enregistrée */
  get(id: string): number {
    const map = JSON.parse(localStorage.getItem(this.KEY) || '{}');
    return map[id] || 0;
  }

  /** enregistrer / mettre à jour la note */
  set(id: string, stars: number): void {
    const map = JSON.parse(localStorage.getItem(this.KEY) || '{}');
    map[id] = stars;
    localStorage.setItem(this.KEY, JSON.stringify(map));
  }
}
