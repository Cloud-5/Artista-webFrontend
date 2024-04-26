import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-img-card',
  templateUrl: './purchase-img-card.component.html',
  styleUrls: ['./purchase-img-card.component.css']

})
export class PurchaseImgCardComponent {
  purchaseHistory = [
    {
      purchaseId: 1,
      purchaseDatetime: '2024-02-24T16:00:00',
      artworks: [
        {
          artwork_name: '3D Art',
          artist_name: 'Artist A',
          artwork_image: 'path/to/image1.jpg'
        },
        {
          artwork_name: 'Motion Art',
          artist_name: 'Artist B',
          artwork_image: 'path/to/image2.jpg'
        }
      ]
    },
    // Add more purchase data as needed
  ];
}
