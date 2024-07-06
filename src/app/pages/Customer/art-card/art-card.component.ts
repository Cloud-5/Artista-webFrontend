import { Component, EventEmitter, Input, Inject, PLATFORM_ID, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItemService } from '../../../shared/cards/arts/arts.service';
import { ArtCardServiceService } from './art-card-service.service';

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrls: ['./art-card.component.css']
})
export class ArtCardComponent {
  @Input() art: any;
  @Input() showRemoveButton: boolean = false;
  @Input() customerUserId!: string;
  @Input() userId!: string; // Assuming userId is passed as an input
  private isBrowser: boolean;

  @Output() removeGalleryItem = new EventEmitter<void>();

  constructor(
    private artCardService: ArtCardServiceService,
    private cartItemService: CartItemService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  formatLikeCount(likeCount: number): string {
    if (likeCount < 1000) {
      return likeCount.toString();
    } else if (likeCount < 1000000) {
      return (likeCount / 1000).toFixed(1) + 'K';
    } else {
      return (likeCount / 1000000).toFixed(1) + 'M';
    }
  }

  removeFromGallery() {
    console.log('art', this.art);
    this.artCardService.removeGalleryItem(this.customerUserId, this.art.artwork_id).subscribe(
      response => {
        this.removeGalleryItem.emit();
        console.log(response.message);
        // Optionally remove the artwork from the UI or refresh the gallery
      },
      error => {
        console.error('Error removing artwork from gallery:', error);
      }
    );
  }

  addCart(art: any) {
    if (this.isBrowser) {
      this.cartItemService.addItem(this.userId, art.artwork_id).subscribe(
        response => {
          console.log('Item added to cart:', response);
        },
        error => {
          console.error('Error adding item to cart:', error);
        }
      );
    } else {
      console.error('Cannot add to cart. HTTP requests are not supported in this environment.');
    }
  }
}
