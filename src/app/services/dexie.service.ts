// // src/app/services/dexie.service.ts
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import Dexie from 'dexie';

// export interface CartItem {
//   artwork_id: string;
//   name: string; // Already defined
//   price: number;
//   quantity: number;
//   artist_name: string; // Add this line
//   thumbnail_url: string; // Add this line
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class DexieService extends Dexie {
//   cartItems!: Dexie.Table<CartItem, string>;

//   private isBrowser: boolean;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     super('MyDatabase');

//     this.isBrowser = isPlatformBrowser(this.platformId);

//     if (this.isBrowser) {
//       this.version(1).stores({
//         cartItems: 'artwork_id, name, price, quantity'
//       });
//       this.cartItems = this.table('cartItems');
//     } else {
//       console.error('IndexedDB is not supported in this environment.');
//     }
//   }

//   async addCartItem(item: CartItem): Promise<void> {
//     if (this.isBrowser) {
//       await this.cartItems.put(item);
//     }
//   }

//   async getAllCartItems(): Promise<CartItem[]> {
//     if (this.isBrowser) {
//       return this.cartItems.toArray();
//     }
//     return [];
//   }

//   async updateCartItem(item: CartItem): Promise<void> {
//     if (this.isBrowser) {
//       await this.cartItems.update(item.artwork_id, item);
//     }
//   }

//   async deleteCartItem(id: string): Promise<void> {
//     if (this.isBrowser) {
//       await this.cartItems.delete(id);
//     }
//   }

//   async clearCart(): Promise<void> {
//     if (this.isBrowser) {
//       await this.cartItems.clear();
//     }
//   }
// }
