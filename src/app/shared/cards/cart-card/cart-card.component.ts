import {Component, Input,} from '@angular/core';
import { CartServiceService } from '../../../pages/cart/services/cart-service.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent {

  @Input() cartItem: any;
  @Input() art: any;

  constructor(private cartService: CartServiceService) {
  }

  increment() {
    this.cartService.incrementItemQuantity(this.cartItem.artwork_id);
  }

  decrement() {
    this.cartService.decrementItemQuantity(this.cartItem.artwork_id);
  }

  singleDelete() {
    this.cartService.deleteItem(this.cartItem.artwork_id);
  }
}
