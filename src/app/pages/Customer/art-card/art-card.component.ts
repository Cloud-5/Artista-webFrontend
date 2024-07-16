import { Component, EventEmitter, Input, Inject, PLATFORM_ID, Output, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItemService } from '../../../shared/cards/arts/arts.service';
import { ArtCardServiceService } from './art-card-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrls: ['./art-card.component.css']
})
export class ArtCardComponent implements OnInit {
  @Input() art: any;
  @Input() showRemoveButton: boolean = false;
  @Input() customerUserId!: string;
  @Input() userId!: string; 
  private isBrowser: boolean;

  currentCustomer:string = localStorage.getItem('user_id') || '';

  @Output() removeGalleryItem = new EventEmitter<void>();

  constructor(
    private artCardService: ArtCardServiceService,
    private cartItemService: CartItemService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.checkLikedStatus();
  }

  checkLikedStatus() {
    console.log('art', this.art);
    console.log('userId', this.userId);
    this.cartItemService.getLikedStatus(this.currentCustomer, this.art.artwork_id)
      .subscribe(
        response => {
          this.art.liked = response.liked; 
          this.art.total_likes = response.total_likes ||0; 
        },
        error => {
          console.error('Error fetching liked status:', error);
        }
      );
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
      this.cartItemService.addItem(this.currentCustomer, art.artwork_id).subscribe(
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

  likeArtwork(art: any) {
    if (art.liked) {
      console.log('artwork liked', art.liked);
      this.cartItemService.likeArtwork(this.currentCustomer, art.artwork_id)
        .subscribe(
          response => {
            console.log('Artwork unliked successfully', response);
            art.liked = false;
            art.total_likes = response.total_likes ||0;
          },
          error => {
            console.error('Error unliking artwork:', error);
          }
        );
    } else {
      // Like artwork
      this.cartItemService.likeArtwork(this.currentCustomer, art.artwork_id)
        .subscribe(
          response => {
            console.log('Artwork liked successfully', response);
            art.liked = true;
            art.total_likes = response.total_likes || 0;
          },
          error => {
            console.error('Error liking artwork:', error);
          }
        );
    }
  }

  goToPreview(art: any) {
    this.router.navigate(['/preview', art.artwork_id]);
    console.log('art', art.artwork_id);
  }
}
