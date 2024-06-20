// src/app/arts/arts.component.ts
import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CartServiceService } from '../../../pages/cart/services/cart-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent {
  @Input() art: any;
  private isBrowser: boolean;

  constructor(private cartService: CartServiceService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  addCart(art: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.addCartItem({
      thumbnail_url: art.thumbnail_url,
      artwork_id: art.artwork_id,
      name: art.artwork_title, // Use artwork_title for name
      artist_name: art.artist_name,
      price: art.price,
      quantity: 1
      });
    } else {
      console.error('Cannot add to cart. IndexedDB is not supported in this environment.');
    }
  }
}
