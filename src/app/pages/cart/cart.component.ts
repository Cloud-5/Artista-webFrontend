import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from './services/cart-service.service';

interface CartItem {
  artwork_id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail_url: string;
  
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalQuantity: number = 0;
  subTotal: number = 0;
  cartItems: CartItem[] = [];

  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit() {
    this.cartService.initCartItems();

    this.cartService.cartItems$.subscribe((items) => {
      this.totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
      this.subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      this.cartItems = items;
    });
  }

  async removeAll() {
    await this.cartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/checkout'], { queryParams: { subtotal: this.subTotal, quantity: this.totalQuantity } });
  }
}
