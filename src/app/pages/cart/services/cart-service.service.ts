import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: any[] = this.loadCartItems();
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initCartItems();
  }

  initCartItems() {
    if (isPlatformBrowser(this.platformId)) {
      const itemsJson = localStorage.getItem('localCart');
      this.cartItems = itemsJson ? JSON.parse(itemsJson) : [];
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  loadCartItems(): any[] {
    if(isPlatformBrowser(this.platformId)){
      const itemsJson = localStorage.getItem('localCart');
      return itemsJson ? JSON.parse(itemsJson) : [];
    }

    return [];
  }

  saveCartItems() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('localCart', JSON.stringify(this.cartItems));
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  incrementItemQuantity(id: string) {
    const item = this.cartItems.find((item) => item.artId === id);
    if (item) {
      item.quantity += 1;
      this.saveCartItems();
    }
  }

  decrementItemQuantity(id: string) {
    const item = this.cartItems.find((item) => item.artId === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveCartItems();
    }
  }

  deleteItem(id: string) {
    this.cartItems = this.cartItems.filter(item => item.artId !== id);
    this.saveCartItems();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.setItem('localCart', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }
}
