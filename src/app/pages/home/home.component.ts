
// import { Component, OnInit } from '@angular/core';
// import { ArtServiceService } from './service/art-service.service';
// import { ArtistServieService } from './service/artist-servie.service';
// import { Router } from '@angular/router';
// @Component({
//     selector: 'app-home',
//     templateUrl: './home.component.html',
//     styleUrl: './home.component.css'
// })
// export class HomeComponent implements OnInit {
//     artsData: any = {};
//     groupedArtsData: any[] = [];
   
//     artistsData = [
//         { /* artist data */ },
//         { /* artist data */ },
//         { /* artist data */ }
//       ];
//       chunkedArtistsData: any[] = [];
//     constructor(private ArtServiceService: ArtServiceService, private ArtistServieService: ArtistServieService, private router: Router) { }

//     ngOnInit(): void {
//         this.getArtwork();
//         this.loadArtistData();
//         this.chunkArtistsData();
//         this.groupArtsData();
        
//       }
     
//       groupArtsData() {
//         const chunkSize = 5; // Set to 6 if you need 6 cards per slide
//         for (let i = 0; i < this.artsData.length; i += chunkSize) {
//           this.groupedArtsData.push(this.artsData.slice(i, i + chunkSize));
//         }
//       }

//     loadArtistData(): void {
//         this.ArtistServieService.getArtist().subscribe(
//             (data: any[]) => {
//                 console.log(data);
//                 this.artistsData = data;

//             },
//             (error) => {
//                 console.error('Error fetching artist data: ', error);
//             }
//         );
//     }

//     chunkArtistsData() {
//         const chunkSize = 5; // or 6
//         for (let i = 0; i < this.artistsData.length; i += chunkSize) {
//           this.chunkedArtistsData.push(this.artistsData.slice(i, i + chunkSize));
//         }
//       }

//     getArtwork(): void {
//         this.ArtServiceService.getArtwork().subscribe(
//             (data: any[]) => {
//                 console.log(data);
//                 this.artsData = data;
//             },
//             (error: any) => {
//                 console.log(error);
//             }
//         );
//     }

//     logout() {
//         // Clear local storage items related to user session
//         localStorage.removeItem('uid');
//         localStorage.removeItem('role');
//         localStorage.removeItem('user_id');
//         localStorage.removeItem('email');
//         localStorage.removeItem('firebase_uid');
      
//         // Navigate to the login page or home page after logout
//         this.router.navigate(['/login']);
//       }
      
// }

import { Component, OnInit } from '@angular/core';
import { ArtServiceService } from './service/art-service.service';
import { ArtistServieService } from './service/artist-servie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artsData: any[] = [];
  groupedArtsData: any[] = [];
  
  artistsData: any[] = [];
  chunkedArtistsData: any[] = [];

  constructor(private artService: ArtServiceService, private artistService: ArtistServieService, private router: Router) {}

  ngOnInit(): void {
    this.getArtwork();
    this.loadArtistData();
  }

  groupArtsData() {
    const chunkSize = 5; // Set to 6 if you need 6 cards per slide
    for (let i = 0; i < this.artsData.length; i += chunkSize) {
      this.groupedArtsData.push(this.artsData.slice(i, i + chunkSize));
    }
  }

  loadArtistData(): void {
    this.artistService.getArtist().subscribe(
      (data: any[]) => {
        console.log(data);
        this.artistsData = data;
        this.chunkArtistsData();
      },
      (error) => {
        console.error('Error fetching artist data: ', error);
      }
    );
  }

  chunkArtistsData() {
    const chunkSize = 5; // or 6
    for (let i = 0; i < this.artistsData.length; i += chunkSize) {
      this.chunkedArtistsData.push(this.artistsData.slice(i, i + chunkSize));
    }
  }

  getArtwork(): void {
    this.artService.getArtwork().subscribe(
      (data: any[]) => {
        console.log(data);
        this.artsData = data;
        this.groupArtsData();
      },
      (error: any) => {
        console.log(error);
      }
    );
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
}
