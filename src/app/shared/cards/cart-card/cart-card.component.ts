import {Component, Input,} from '@angular/core';
//import { CartServiceService } from '../../../pages/cart/services/cart-service.service';
import { CartItemService } from '../../../shared/cards/arts/arts.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent {

  @Input() cartItem: any;
  @Input() art: any;
  @Output() itemChanged = new EventEmitter<void>();
  @Output() itemRemoved = new EventEmitter<void>();
  userId: number =localStorage.getItem('user_id') ? Number(localStorage.getItem('user_id')) : 0;

  constructor(//private cartService: CartServiceService,
     private cartItemService: CartItemService) {
  }

  increment() {
    console.log(this.cartItem.artwork_id, this.userId,this.cartItem.quantity)
    this.cartItemService.incrementQuantity(this.userId,this.cartItem.artwork_id).subscribe(
      () => {
        this.cartItem.quantity += 1;
        this.itemChanged.emit();
      },
      (error) => {
        if (error.status === 404) {
          console.error('Item not found in cart');
          // Handle the error gracefully, such as displaying a message to the user
        } else {
          console.error('Error incrementing quantity', error);
          // Handle other types of errors, such as displaying a generic error message
        }
      }
    );
  }
  
  
  decrement() {
    console.log(this.cartItem.artwork_id, this.userId,this.cartItem.quantity)
    this.cartItemService.decrementQuantity(this.userId,this.cartItem.artwork_id).subscribe(
      () => {
        this.cartItem.quantity -= 1;
        this.itemChanged.emit();
      },
      (error) => {
        if (error.status === 404) {
          console.error('Item not found in cart');
          // Handle the error gracefully, such as displaying a message to the user
        } else {
          console.error('Error decrementing quantity', error);
          // Handle other types of errors, such as displaying a generic error message
        }
      }
    );
  }

  singleDelete() {
    this.cartItemService.removeItem(this.userId, this.cartItem.artwork_id).subscribe(
      () => {
        console.log('Item removed from cart:', this.cartItem.artwork_id);
        this.itemRemoved.emit();
        // Here you should update the UI to reflect the item removal
        // For example, you can emit an event or directly manipulate the cart items array
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
}
