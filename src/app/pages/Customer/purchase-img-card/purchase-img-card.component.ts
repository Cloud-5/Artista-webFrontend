
import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';

@Component({
  selector: 'app-purchase-img-card',
  templateUrl: './purchase-img-card.component.html',
  styleUrls: ['./purchase-img-card.component.css']
})
export class PurchaseImgCardComponent implements OnInit {
  artworks: any[] = [];

  constructor(private purchaseHistoryService :PurchaseHistoryService) {} // Inject the service

  ngOnInit(): void {
    this.getPurchases(3);
  }

  getPurchases(userId: number ): void {
    this.purchaseHistoryService.getPurchaseHistory(userId).subscribe(
      (data: any) => {
        this.artworks = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
