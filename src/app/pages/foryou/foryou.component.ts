import { Component,Input,OnInit } from '@angular/core';
import { ForyouServiceService } from './foryou-service.service';


@Component({
  selector: 'app-foryou',
  templateUrl: './foryou.component.html',
  styleUrls: ['./foryou.component.css']
})
export class ForyouComponent {

  artsData: any[]= [];
  userId: number =  localStorage.getItem('user_id') ? Number(localStorage.getItem('user_id')) : 0;

  constructor(private foryouService: ForyouServiceService) { }

  // artsData = [
  //   { artId:1, artImgUrl: '../assets/images/digitalIllustrations.jpg', artworkName: 'Mystic Mountains', price: 150, artistName: 'Emma Turner', likeCount: 2350,quantity:1 },
  //   { artId:2, artImgUrl: '../assets/images/3DIMG.jpg', artworkName: 'Cosmic Dream', price: 220, artistName: 'Jackson Lee', likeCount: 4100,quantity:1 },
  //   { artId:3, artImgUrl: '../assets/images/3d.png', artworkName: 'Enchanted Forest', price: 180, artistName: 'Luna Wang', likeCount: 3120,quantity:1 },
  //   { artId:4, artImgUrl: '../assets/images/vectorArt.jpg', artworkName: 'Neon Nights', price: 200, artistName: 'Max Cooper', likeCount: 2750,quantity:1 },
  //   { artId:5, artImgUrl: '../assets/images/pixelart.png', artworkName: 'Pixel Pioneers', price: 120, artistName: 'Sophie Clarke', likeCount: 1980,quantity:1 },
  //   { artId:6, artImgUrl: '../assets/images/motionArt.png', artworkName: 'Eternal Waves', price: 250, artistName: 'Benjamin Adams', likeCount: 4200,quantity:1 },
  //   { artId:7, artImgUrl: '../assets/images/generativeArts.jpg', artworkName: 'Digital Eden', price: 190, artistName: 'Aria Nguyen', likeCount: 3600,quantity:1 },
  //   { artId:8, artImgUrl: '../assets/images/graphicDesign.jpg', artworkName: 'Cityscape Symphony', price: 170, artistName: 'Elijah Roberts', likeCount: 2900,quantity:1 },
  //   { artId:9, artImgUrl: '../assets/images/digicol.jpg', artworkName: 'Vivid Visions', price: 210, artistName: 'Isabella Hill', likeCount: 3950,quantity:1 },
  //   { artId:10, artImgUrl: '../assets/images/digitalIllustrations.jpg', artworkName: 'Celestial Serenade', price: 140, artistName: 'Oscar White', likeCount: 2400,quantity:1 },
  //   { artId:11, artImgUrl: '../assets/images/3DIMG.jpg', artworkName: 'Aurora Reverie', price: 230, artistName: 'Ava Brown', likeCount: 4300,quantity:1 },
  //   { artId:12,artImgUrl: '../assets/images/3d.png', artworkName: 'Mythical Meadows', price: 190, artistName: 'Milo Taylor', likeCount: 3250,quantity:1 },
  //   { artId:13, artImgUrl: '../assets/images/vectorArt.jpg', artworkName: 'Techno Jungle', price: 210, artistName: 'Nora King', likeCount: 2850,quantity:1 },
  //   { artId:14, artImgUrl: '../assets/images/pixelart.png', artworkName: 'Retro Radiance', price: 130, artistName: 'James Chen', likeCount: 2070,quantity:1 },
  //   { artId:15, artImgUrl: '../assets/images/motionArt.png', artworkName: 'Galactic Groove', price: 260, artistName: 'Chloe Foster', likeCount: 4400,quantity:1 },
  //   { artId:16, artImgUrl: '../assets/images/generativeArts.jpg', artworkName: 'Artificial Arcadia', price: 200, artistName: 'Liam Murphy', likeCount: 3750,quantity:1 }
  // ];

  // loadArtistData(): void{
  //   this.artistService.getArtist().subscribe((data: any[]) => {
  //     console.log('Artist data: ', data);
  //     this.artistsData = data;
  //     this.filteredArtists = this.artistsData; 
  //   }, (error) => {
  //     console.error('Error fetching artist data: ', error);
  //   });
  // }
  
  ngOnInit(): void {
    this.loadArtworkData(this.userId);
  }
  loadArtworkData (userId: number):void{
    this.foryouService.fetchAll(userId).subscribe((data: any[]) => {
      console.log('Cart data: ', data);
      this.artsData = data;
    }, (error) => {
      console.error('Error fetching cart data: ', error);
    });
  }
 

}
