import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';

@Component({
  selector: 'app-purchase-img-card',
  templateUrl: './purchase-img-card.component.html',
  styleUrls: ['./purchase-img-card.component.css']
})
export class PurchaseImgCardComponent implements OnInit {
  purchaseHistory: any[] = [];

  constructor(private purchaseHistoryService: PurchaseHistoryService) { }

  ngOnInit(): void {
    this.getPurchaseHistory();
  }

  getPurchaseHistory(): void {
    const userId = 3;

    this.purchaseHistoryService.getPurchaseHistory(userId)
      .subscribe(
        (data: any[]) => {
          this.purchaseHistory = data;
        },
        (error) => {
          console.error('Error fetching purchase history:', error);
        }
      );
  }

  parseArtworks(artworksString: string): any[] {
    try {
      console.log('Artworks String:', artworksString); // Log the artworks string
      // Split the string by '},' to separate individual artworks
      const artworksArray = artworksString.split('},{');
      // Add '}' back to the last element to fix parsing
      artworksArray[artworksArray.length - 1] += '}';
      // Parse each artwork string into an object
      const artworks = artworksArray.map(artworkString => JSON.parse(artworkString));
      console.log('Parsed artworks:', artworks); // Log the parsed artworks
      return artworks;
    } catch (error) {
      console.error('Error parsing artworks:', error);
      return [];
    }
  }

}
