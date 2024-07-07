import { ArtistCreationsService } from './../artist-creations/artist-creations.service';
import { Component, OnInit } from '@angular/core';
import { ArtistNewHomeServiceService } from './artist-new-home-service.service';

@Component({
  selector: 'app-artist-new-home',
  templateUrl: './artist-new-home.component.html',
  styleUrl: './artist-new-home.component.css'
})
export class ArtistNewHomeComponent implements OnInit {

  public userData: any = {};
  private socialAccounts: any[] = [];
  public artworks: any = [];
  router: any;
  public artworksCount: number = 0;
  private rank:number = 0;


  constructor(private artistServices: ArtistNewHomeServiceService,ArtistCreationsService:ArtistCreationsService) { }

  ngOnInit(): void {
    this.loadArtistData();
    this.loadArtworks();
    this.loadArtworksCount();;
  }

  loadArtistData(): void {
    this.artistServices.getArtistDetail('1').subscribe((data: any) => {
      this.userData = data.artistData[0];
      this.socialAccounts = data.socialAccounts;
      this.rank = data.rank.featured;
      console.log("Artist Details:========================== ", this.rank);

      //this.artworks.reverse();
    })
  }

  loadArtworks(): void {
    this.artistServices.getArtworksForArtist(1).subscribe((data: any) => {
      this.artworks = data;
      data.forEach((e: any) => {
        console.log(e.artwork_id)
       let id =  this.getArtworkLikes(e.artwork_id);
       console.log(id);
      });
      //console.log("Artworks: ", data);
    })
  }


  getArtworkLikes(artId: number): void {
    this.artistServices.getLikeCountForArtwork(artId).subscribe((data: any) => {
      return data[0].count;
    })
  }

  logout() {
    // Clear local storage items related to user session
    localStorage.removeItem('uid');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('firebase_uid');

    // Navigate to the login page or home page after logout
    this.router.navigate(['/login']);
  }
  loadArtworksCount(): void {
    this.artistServices.getArtworksCountForArtist(1).subscribe((data: any) => {
      this.artworksCount = data.count;
      console.log("Artworks Count: ", data.count);
    });
  }

  deleteArtwork(artId: number): void {
    this.artistServices.deleteArtwork(artId).subscribe(() => {
      this.loadArtworks();
    })
  }

  updateArtwork(artId: number, artwork: any): void {
    this.artistServices.updateArtwork(artId, artwork).subscribe(() => {
      this.loadArtworks();
    })
  }

  // artsData = [
  //   { artImgUrl: '../assets/imgs/creations (1).jpeg', artworkName: 'Mystic Mountains',purchaseCount:2, price: 150,likeCount: 2350 ,purchased:1},
  //   { artImgUrl: '../assets/imgs/3DIMG.jpg', artworkName: 'Cosmic Dream', price: 220, purchaseCount:2, likeCount: 4100,purchased:1 },
  //   { artImgUrl: '../assets/imgs/creations (4).jpeg', artworkName: 'Enchanted Forest', price: 180, purchaseCount:2, likeCount: 3120,purchased:1 },
  //   { artImgUrl: '../assets/imgs/creations (3).jpeg', artworkName: 'Neon Nights', price: 200, purchaseCount:2, likeCount: 2750,purchased:1 },
  //   { artImgUrl: '../assets/imgs/creations (2).jpeg', artworkName: 'Pixel Pioneers', price: 120, purchaseCount:2, likeCount: 1980 ,purchased:1},
  //   { artImgUrl: '../assets/imgs/motionArt.png', artworkName: 'Eternal Waves', price: 250, purchaseCount:2, likeCount: 4200 ,purchased:1},
  //   { artImgUrl: '../assets/imgs/generativeArts.jpg', artworkName: 'Digital Eden', price: 190, purchaseCount:2, likeCount: 3600,purchased:1 },
  //   { artImgUrl: '../assets/imgs/graphicDesign.jpg', artworkName: 'Cityscape Symphony', price: 170,purchaseCount:2,  likeCount: 2900,purchased:1 },
  //   { artImgUrl: '../assets/imgs/creations (7).jpeg', artworkName: 'Galactic Groove', price: 260, purchaseCount:2, likeCount: 4400,purchased:1 },
  // ];

}

//************************* */ here is for artist creations make by me

