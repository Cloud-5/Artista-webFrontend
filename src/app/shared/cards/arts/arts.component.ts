import { Component,Input } from '@angular/core';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls:[ './arts.component.css']
})
export class ArtsComponent  {

  @Input() art: any;
  itemsCart:any=[];

  constructor(){}
  
  formatLikeCount(likeCount: number): string {
    if (likeCount < 1000) {
      return likeCount.toString();
    } else if (likeCount < 1000000) {
      return (likeCount / 1000).toFixed(1) + 'K';
    } else {
      return (likeCount / 1000000).toFixed(1) + 'M';
    }
  }
addCart(art: any) {
  
  console.log(art);

 
  let cartDataString = localStorage.getItem('localCart');
  let cartData: any[] = cartDataString ? JSON.parse(cartDataString) : [];
// Create a new array to record cart items and quantities
let recordedCartData: any[] = [];

  if (!Array.isArray(cartData)) {
  
    cartData = [];
  }

 
  let existingItemIndex = cartData.findIndex(item => parseInt(item.artId) === parseInt(art.artId));

  if (existingItemIndex !== -1) {
   
    cartData[existingItemIndex].quantity++; 
  } else {
   
    art.quantity = 1; 
    cartData.push(art);
  }
  cartData.forEach(item => {
    recordedCartData.push({ artId: item.artId, quantity: item.quantity });
  });

  // Store the recordedCartData in local storage
  localStorage.setItem('recordedCart', JSON.stringify(recordedCartData));
  
  localStorage.setItem('localCart', JSON.stringify(cartData));
  console.log('recordedCartData: ', recordedCartData);
}



}


