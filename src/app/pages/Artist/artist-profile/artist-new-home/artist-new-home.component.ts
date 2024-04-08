import { Component, OnInit } from '@angular/core';
import { ArtistNewHomeServiceService } from './artist-new-home-service.service';

@Component({
  selector: 'app-artist-new-home',
  templateUrl: './artist-new-home.component.html',
  styleUrl: './artist-new-home.component.css'
})
export class ArtistNewHomeComponent implements OnInit {

  public userData: any = {};
  public artworks: any = [];

  constructor(private artistServices: ArtistNewHomeServiceService) { }

  ngOnInit(): void {
    this.loadArtistData();
    this.loadArtworks();
  }

  loadArtistData(): void {
    this.artistServices.getArtistDetail(1).subscribe((data: any) => {
      this.userData = data;
      console.log("Artist Details: ", data);

      this.artworks.reverse();
    })
  }

  loadArtworks(): void {
    this.artistServices.getArtworksForArtist(1).subscribe((data: any) => {
      this.artworks = data;
      // data.forEach((e: any) => {
      //   console.log(e.artwork_id)
      //  let id =  this.getArtworkLikes(e.artwork_id);
      //  console.log(id);
      // });
      console.log("Artworks: ", data);
    })
  }

  getArtworkLikes(artId: number): void {
    this.artistServices.getLikeCountForArtwork(artId).subscribe((data: any) => {
      return data[0].count;
    })
  }

  artsData = [
    { artImgUrl: '../assets/imgs/creations (1).jpeg', artworkName: 'Mystic Mountains',purchaseCount:2, price: 150,likeCount: 2350 ,purchased:1},
    { artImgUrl: '../assets/imgs/3DIMG.jpg', artworkName: 'Cosmic Dream', price: 220, purchaseCount:2, likeCount: 4100,purchased:1 },
    { artImgUrl: '../assets/imgs/creations (4).jpeg', artworkName: 'Enchanted Forest', price: 180, purchaseCount:2, likeCount: 3120,purchased:1 },
    { artImgUrl: '../assets/imgs/creations (3).jpeg', artworkName: 'Neon Nights', price: 200, purchaseCount:2, likeCount: 2750,purchased:1 },
    { artImgUrl: '../assets/imgs/creations (2).jpeg', artworkName: 'Pixel Pioneers', price: 120, purchaseCount:2, likeCount: 1980 ,purchased:1},
    { artImgUrl: '../assets/imgs/motionArt.png', artworkName: 'Eternal Waves', price: 250, purchaseCount:2, likeCount: 4200 ,purchased:1},
    { artImgUrl: '../assets/imgs/generativeArts.jpg', artworkName: 'Digital Eden', price: 190, purchaseCount:2, likeCount: 3600,purchased:1 },
    { artImgUrl: '../assets/imgs/graphicDesign.jpg', artworkName: 'Cityscape Symphony', price: 170,purchaseCount:2,  likeCount: 2900,purchased:1 },
    { artImgUrl: '../assets/imgs/creations (7).jpeg', artworkName: 'Galactic Groove', price: 260, purchaseCount:2, likeCount: 4400,purchased:1 },
  ];

}
