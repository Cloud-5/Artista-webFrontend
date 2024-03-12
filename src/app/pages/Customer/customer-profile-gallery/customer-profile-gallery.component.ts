import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-profile-gallery',
  templateUrl: './customer-profile-gallery.component.html',
  styleUrl: './customer-profile-gallery.component.css',
})
export class CustomerProfileGalleryComponent {

  artsData = [
    { artImgUrl: '../assets/imgs/digitalIllustrations.jpg', artworkName: 'Mystic Mountains', price: 150, artistName: 'Emma Turner', likeCount: 2350 },
    { artImgUrl: '../assets/imgs/3DIMG.jpg', artworkName: 'Cosmic Dream', price: 220, artistName: 'Jackson Lee', likeCount: 4100 },
    { artImgUrl: '../assets/imgs/3d.png', artworkName: 'Enchanted Forest', price: 180, artistName: 'Luna Wang', likeCount: 3120 },
    { artImgUrl: '../assets/imgs/vectorArt.jpg', artworkName: 'Neon Nights', price: 200, artistName: 'Max Cooper', likeCount: 2750 },
    { artImgUrl: '../assets/imgs/pixelart.png', artworkName: 'Pixel Pioneers', price: 120, artistName: 'Sophie Clarke', likeCount: 1980 },
    { artImgUrl: '../assets/imgs/motionArt.png', artworkName: 'Eternal Waves', price: 250, artistName: 'Benjamin Adams', likeCount: 4200 },
    { artImgUrl: '../assets/imgs/generativeArts.jpg', artworkName: 'Digital Eden', price: 190, artistName: 'Aria Nguyen', likeCount: 3600 },
    { artImgUrl: '../assets/imgs/graphicDesign.jpg', artworkName: 'Cityscape Symphony', price: 170, artistName: 'Elijah Roberts', likeCount: 2900 },
    { artImgUrl: '../assets/imgs/motionArt.png', artworkName: 'Galactic Groove', price: 260, artistName: 'Chloe Foster', likeCount: 4400 },
  ];


}
