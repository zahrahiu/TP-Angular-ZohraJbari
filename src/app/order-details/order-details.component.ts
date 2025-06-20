import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
   showLangMenu = false;
  statusText = 'Commande en cours';

  packagingOptions = [
    { id: 'pk40', name: 'Écrin Ruban Rouge', price: 40, imageUrl: 'assets/images/emb1.jpg' },
    { id: 'pk35', name: 'Boîte Florale',     price: 35, imageUrl: 'assets/images/emb2.jpg' },
    { id: 'pk27', name: 'Tissu Velours',     price: 27, imageUrl: 'assets/images/emb3.jpg' },
    { id: 'pk25', name: 'Coffret Luxe Or',   price: 25, imageUrl: 'assets/images/emb4.jpg' },
    { id: 'pk20', name: 'Coffret Luxe Or',   price: 20, imageUrl: 'assets/images/emb5.jpg' },
    { id: 'pk30', name: 'Coffret Luxe Or',   price: 30, imageUrl: 'assets/images/emb6.jpg' },
    { id: 'pk10', name: 'Coffret Luxe Or',   price: 10, imageUrl: 'assets/images/emb7.jpg' },
    { id: 'pk15', name: 'Coffret Luxe Or',   price: 15, imageUrl: 'assets/images/emb8.jpg' },
    { id: 'pk05', name: 'Coffret Luxe Or',   price: 5, imageUrl: 'assets/images/emb9.jpg' },

  ];

  ngOnInit() {
    const saved = localStorage.getItem('lastOrder');
    if (saved) {
      this.order = JSON.parse(saved);

      setTimeout(() => this.statusText = 'Commande expédiée', 8000);
      setTimeout(() => this.statusText = 'Commande livrée', 16000);
    }
  }

  printOrder() {
  window.print();
}

toggleLangMenu() {
    this.showLangMenu = !this.showLangMenu;
  }
  
goToLang(lang: 'fr-FR' | 'en-US') {
    this.showLangMenu = false;
    window.location.href = `http://localhost:8085/${lang}/order-details`;
  }

downloadInvoice() {
  if (!this.order) return;

  const element = document.getElementById('order-details-for-pdf');
  if (!element) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  doc.setFont('Playfair Display', 'bold');
  doc.setFontSize(24);
  doc.setTextColor('#D6336C');  
  doc.text('PARFUMS LUXE', 40, 40);


  html2canvas(element, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth() - 80;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(imgData, 'PNG', 40, 60, pdfWidth, pdfHeight);

    doc.save('Parfums_Luxe_Facture.pdf');
  });
}

getSelectedPackaging() {
  return this.packagingOptions.find(p => p.id === this.order?.userInfo?.packagingId);
}

}
