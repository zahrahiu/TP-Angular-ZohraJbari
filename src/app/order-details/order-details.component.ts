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
  statusText = 'Commande en cours';

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

}
