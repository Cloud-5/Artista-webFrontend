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
  @Input() userId!:string;
  //private isBrowser: boolean;

  constructor(//private cartService: CartServiceService,
  private cartItemService: CartItemService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    //this.isBrowser = isPlatformBrowser(this.platformId);
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

  goToPreview(art: any) {
    this.router.navigate(['/preview', art.artwork_id]);
    console.log('art', art.artwork_id);
  }
}