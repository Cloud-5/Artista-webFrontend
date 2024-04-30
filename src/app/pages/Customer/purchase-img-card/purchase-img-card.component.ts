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

  userId:number = 3
  purchaseData: any[] =[];

  
  ngOnInit(): void {
    this.loadPurchseHistory(this.userId);
    console.log(this.purchaseData);
  }

  loadPurchseHistory(userId: number):void {
    this.purchaseHistoryService.getPurchaseHistory(userId)
    .subscribe((data: any[]) => {
      this.purchaseData = data;
      console.log('purchase data',this.purchaseData);
    });
  }


  // purchaseHistory = [
  //   {
  //     purchaseId: 1,
  //     purchaseDatetime: '2024-02-24T16:00:00',
  //     artworks: [
  //       {
  //         artwork_name: '3D Art',
  //         artist_name: 'Artist A',
  //         artwork_image: 'path/to/image1.jpg'
  //       },
  //       {
  //         artwork_name: 'Motion Art',
  //         artist_name: 'Artist B',
  //         artwork_image: 'path/to/image2.jpg'
  //       }
  //     ]
  //   },
  //   // Add more purchase data as needed
  // ];
}
