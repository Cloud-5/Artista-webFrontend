// src/app/arts/arts.component.ts
import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
//import { CartServiceService } from '../../../pages/cart/services/cart-service.service';
//import { isPlatformBrowser } from '@angular/common';
import { CartItemService } from '../../../shared/cards/arts/arts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent {
  @Input() art: any;
  @Input() userId!: string;
  //private isBrowser: boolean;

  constructor(//private cartService: CartServiceService,
  private cartItemService: CartItemService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    //this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Check if the artwork is liked by the current user
    if (this.art && this.userId) {
      this.checkLikedStatus();
    }
    console.log(this.art, 'arts in arts component');
  }
  addCart(art: any) {
    
      this.cartItemService.addItem(this.userId, art.artwork_id) // Replace '1' with the actual user_id
        .subscribe(
          response => {
            console.log('Item added to cart:', response);
          },
          error => {
            console.error('Error adding item to cart:', error);
          }
        );
   
  }
  checkLikedStatus() {
    this.cartItemService.getLikedStatus(this.userId, this.art.artwork_id)
      .subscribe(
        response => {
          this.art.liked = response.liked; // Update liked status for the artwork
          // this.art.total_likes = response.total_likes ||0; // Update total likes count
        },
        error => {
          console.error('Error fetching liked status:', error);
        }
      );
  }
  likeArtwork(art: any) {
    if (art.liked) {
      // Unlike artwork
      this.cartItemService.likeArtwork(this.userId, art.artwork_id)
        .subscribe(
          response => {
            console.log('Artwork unliked successfully', response);
            art.liked = false;
            // art.total_likes = response.total_likes ||0;
            art.total_likes -= 1;
          },
          error => {
            console.error('Error unliking artwork:', error);
          }
        );
    } else {
      // Like artwork
      this.cartItemService.likeArtwork(this.userId, art.artwork_id)
        .subscribe(
          response => {
            console.log('Artwork liked successfully', response);
            art.liked = true;
            // art.total_likes = response.total_likes || 0;
            art.total_likes += 1;
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

  getTotalLikes() {
    this.cartItemService.getTotalLikes(this.art.artwork_id)
      .subscribe(
        response => {
          this.art.total_likes = response.total_likes ; // Update total likes count for the artwork
          console.log('Total likes:', response.total_likes);
        },
        error => {
          console.error('Error fetching total likes:', error);
        }
      );
  }
}