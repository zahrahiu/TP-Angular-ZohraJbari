import { Component, OnInit } from '@angular/core';
import {
  CommonModule,
  NgIf,
  NgFor,
  DatePipe,
  CurrencyPipe
} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],

  imports: [
    CommonModule,  
    NgIf,
    NgFor,
    DatePipe,RouterModule,
    CurrencyPipe
  ]
})
export class OrderDetailsComponent implements OnInit { 
  order: any;
  statusText = 'Commande en cours';

  ngOnInit() {
    const saved = localStorage.getItem('lastOrder');
    if (saved) {
      this.order = JSON.parse(saved);

      setTimeout(() => this.statusText = 'Commande expédiée', 8000);
      setTimeout(() => this.statusText = 'Commande livrée', 16000);
    }
  }
}
