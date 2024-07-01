// src/app/arts/arts.component.ts
import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
//import { CartServiceService } from '../../../pages/cart/services/cart-service.service';
import { isPlatformBrowser } from '@angular/common';
import { CartItemService } from '../../../shared/cards/arts/arts.service';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent {
  @Input() art: any;
  @Input() userId!: number;
  private isBrowser: boolean;

  constructor(//private cartService: CartServiceService,
  private cartItemService: CartItemService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  addCart(art: any) {
    if (this.isBrowser) {
      this.cartItemService.addItem(this.userId, art.artwork_id) // Replace '1' with the actual user_id
        .subscribe(
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