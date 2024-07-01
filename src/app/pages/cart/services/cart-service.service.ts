// // src/app/services/cart-service.service.ts
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { DexieService, CartItem } from '../../../services/dexie.service';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartServiceService {
//   private cartItems: CartItem[] = [];
//   private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
//   cartItems$ = this.cartItemsSubject.asObservable();
//   private isBrowser: boolean;

//   constructor(private dexieService: DexieService, @Inject(PLATFORM_ID) private platformId: Object) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//     if (this.isBrowser) {
//       this.initCartItems();
//     }
//   }

//   async initCartItems() {
//     if (this.isBrowser) {
//       this.cartItems = await this.dexieService.getAllCartItems();
//       this.cartItemsSubject.next(this.cartItems);
//     }
//   }

//   async addCartItem(item: CartItem) {
//     if (this.isBrowser) {
//       const existingItem = this.cartItems.find(cartItem => cartItem.artwork_id === item.artwork_id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//         await this.dexieService.updateCartItem(existingItem);
//       } else {
//         item.quantity = 1;
//         await this.dexieService.addCartItem(item);
//       }
//       await this.initCartItems();
//     } else {
//       // Fallback to localStorage
//       let cartItemsStr = localStorage.getItem('cartItems');
//       let cartItems: CartItem[] = cartItemsStr ? JSON.parse(cartItemsStr) : [];
//       const existingItem = cartItems.find(cartItem => cartItem.artwork_id === item.artwork_id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         item.quantity = 1;
//         cartItems.push(item);
//       }
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       this.cartItemsSubject.next(cartItems);
//     }
//   }

//   async incrementItemQuantity(id: string) {
//     if (this.isBrowser) {
//       const item = this.cartItems.find(cartItem => cartItem.artwork_id === id);
//       if (item) {
//         item.quantity += 1;
//         await this.dexieService.updateCartItem(item);
//         this.initCartItems();
//       }
//     }
//   }

//   async decrementItemQuantity(id: string) {
//     if (this.isBrowser) {
//       const item = this.cartItems.find(cartItem => cartItem.artwork_id === id);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         await this.dexieService.updateCartItem(item);
//         this.initCartItems();
//       }
//     }
//   }

//   async deleteItem(id: string) {
//     if (this.isBrowser) {
//       await this.dexieService.deleteCartItem(id);
//       this.initCartItems();
//     }
//   }

//   async clearCart() {
//     if (this.isBrowser) {
//       await this.dexieService.clearCart();
//       this.initCartItems();
//     } else {
//       localStorage.removeItem('cartItems');
//       this.cartItems = [];
//       this.cartItemsSubject.next([]);
//     }
//   }
// }
