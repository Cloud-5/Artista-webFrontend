
import { Component, HostListener, OnInit } from '@angular/core';
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
    artistsData : any= {};
   searchTerm: string = ''; // Added property to store search term

  currentIndex: number = 0;
  currentArtistIndex: number = 0;
  itemWidth: number = 25;
  gap: number = 16;
  dataLoaded: boolean = false;
  artData: any;


    constructor(private ArtServiceService: ArtServiceService
      , private ArtistServieService: ArtistServieService,
       private router: Router) { }

    ngOnInit(): void {
        this.getArtwork();
        this.loadArtistData();
        this.updateItemWidth();
      }
     
     
    loadArtistData(): void {
        this.ArtistServieService.getArtist().subscribe(
            (data: any[]) => {
                console.log(data);
                this.artistsData = data;
                this.dataLoaded = true;
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
                this.dataLoaded = true;
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
// Method to handle search form submission
   onSearchSubmit(): void {
    if (this.searchTerm.trim()) {
       this.router.navigate(['/search-art'], { queryParams: { q: this.searchTerm}});
 }
 } 
    // logout() {
    //     // Clear local storage items related to user session
    //     localStorage.removeItem('uid');
    //     localStorage.removeItem('role');
    //     localStorage.removeItem('user_id');
    //     localStorage.removeItem('email');
    //     localStorage.removeItem('firebase_uid');
      
    //     // Navigate to the login page or home page after logout
    //     this.router.navigate(['/login']);
    //   }
      



    next(): void {
      if (this.currentIndex < this.artsData.length - (100 / this.itemWidth)) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateCarousel('.artwork-carousel', this.currentIndex);
    }
  
    prev(): void {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.artData.length - (100 / this.itemWidth);
      }
      this.updateCarousel('.artwork-carousel',this.currentIndex);
    }
  

    nextArtist(): void {
      if (this.currentArtistIndex < this.artistsData.length - (100 / this.itemWidth)) {
        this.currentArtistIndex++;
      } else {
        this.currentArtistIndex = 0;
      }
      this.updateCarousel('.artist-carousel', this.currentArtistIndex);
    }
  
    prevArtist(): void {
      if (this.currentArtistIndex > 0) {
        this.currentArtistIndex--;
      } else {
        this.currentArtistIndex = this.artistsData.length - (100 / this.itemWidth);
      }
      this.updateCarousel('.artist-carousel', this.currentArtistIndex);
    }
  
    updateCarousel(selector: string, index: number): void {
      const carousel = document.querySelector(selector) as HTMLElement;
      const gapAdjustment = (this.gap / window.innerWidth) * 100;
      const translateValue = -(index * (this.itemWidth + gapAdjustment));
      carousel.style.transform = `translateX(${translateValue}%)`;
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
      this.updateItemWidth();
    }
  
    updateItemWidth(): void {
      const width = window.innerWidth;
      if (width >= 1200) {
        this.itemWidth = 25;
      } else if (width >= 992 && width < 1200) {
        this.itemWidth = 33.33;
      } else if (width >= 768 && width < 992) {
        this.itemWidth = 50;
      } else {
        this.itemWidth = 100;
      }
      this.updateCarousel('.artwork-carousel',this.currentIndex);
      this.updateCarousel('.artist-carousel', this.currentArtistIndex);
    }
  
    viewArtwork(artworkId: string): void {
      this.router.navigate(['/preview', artworkId]);
    }
  }



