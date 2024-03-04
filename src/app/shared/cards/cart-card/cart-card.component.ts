import { Component, Input, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent  {

  @Input() getCartDetails: any;
  @Input() art: any;
  @Output() countChange = new EventEmitter<number>(); // Output property
  
  count: number = 1;
  totalPrice: number = 0;
  

  ngOnInit() {
   
  }
 
  increment(artId: any, quantity:any) {
    console.log(this.getCartDetails.artId);
    console.log(this.getCartDetails.quantity);

    this.getCartDetails.quantity = quantity + 1;

    let cartDataString = localStorage.getItem('localCart');
    let cartData: any[] = cartDataString ? JSON.parse(cartDataString) : [];

    if (!Array.isArray(cartData)) {
      cartData = [];
    }

    let existingItemIndex = cartData.findIndex(item => parseInt(item.artId) === parseInt(artId));
    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity++; 
    } else {
      this.art.quantity = 1; 
      cartData.push(this.art);
    }
      localStorage.setItem('localCart', JSON.stringify(cartData));
      
        }

  
    decrement(artId:any, quantity:any) {
      console.log(this.getCartDetails.artId);
      console.log(this.getCartDetails.quantity);
  
      // Check if the quantity is already 1 before decrementing
      if (quantity > 1) {
          this.getCartDetails.quantity = quantity - 1;
  
          let cartDataString = localStorage.getItem('localCart');
          let cartData: any[] = cartDataString ? JSON.parse(cartDataString) : [];
  
          if (!Array.isArray(cartData)) {
              cartData = [];
          }
  
          let existingItemIndex = cartData.findIndex(item => parseInt(item.artId) === parseInt(artId));
          if (existingItemIndex !== -1) {
              // Ensure quantity doesn't go below 1
              if (cartData[existingItemIndex].quantity > 1) {
                  cartData[existingItemIndex].quantity--;
              }
          }
          localStorage.setItem('localCart', JSON.stringify(cartData));
          
      } else {
          console.log("Quantity cannot be less than 1.");
      }
  }
  singleDelete(artId: any) {
    console.log(artId);
  
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].artId === artId) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          break; // Exit the loop after deleting the item
        }
      }
    }
  }
  
  
  
}
