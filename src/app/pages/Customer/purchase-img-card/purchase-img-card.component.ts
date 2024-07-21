import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';


@Component({
  selector: 'app-purchase-img-card',
  templateUrl: './purchase-img-card.component.html',
  styleUrls: ['./purchase-img-card.component.css']
})
export class PurchaseImgCardComponent implements OnInit {

  constructor(
    private purchaseHistoryService: PurchaseHistoryService
  ){}

  userId:string = localStorage.getItem('user_id') || '';
  purchaseData: any[] =[];


  ngOnInit(): void {
    this.loadPurchseHistory(this.userId);
    console.log(this.purchaseData);
  }

  loadPurchseHistory(userId: string):void {
    this.purchaseHistoryService.getPurchaseHistory(userId)
    .subscribe((data: any[]) => {
      this.purchaseData = data;
      console.log('purchase data',this.purchaseData);
    });
  }

  deletePurchase(purchaseId: number): void {
    this.purchaseHistoryService.deletePurchase(purchaseId)
    .subscribe(() => {
      this.loadPurchseHistory(this.userId);
    });
  }

  onPurchaseDeleted(purchaseId: number): void {
    this.purchaseData = this.purchaseData.filter(purchase => purchase.purchase_id !== purchaseId);
  }
}
