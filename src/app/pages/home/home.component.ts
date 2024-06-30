
import { Component, OnInit } from '@angular/core';
import { ArtServiceService } from './service/art-service.service';
import { ArtistServieService } from './service/artist-servie.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    artsData: any = {};
    artistsData: any = {};
   
   
 
    constructor(private ArtServiceService: ArtServiceService, private ArtistServieService: ArtistServieService, private router: Router) { }

    ngOnInit(): void {
        this.getArtwork();
        this.loadArtistData();
       
        
      }

    loadArtistData(): void {
        this.ArtistServieService.getArtist().subscribe(
            (data: any[]) => {
                console.log(data);
                this.artistsData = data;

            },
            (error) => {
                console.error('Error fetching artist data: ', error);
            }
        );
    }

   

    getArtwork(): void {
        this.ArtServiceService.getArtwork().subscribe(
            (data: any[]) => {
                console.log(data);
                this.artsData = data;
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

