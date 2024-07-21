import { ArtistCreationsService } from './../artist-creations/artist-creations.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ArtistNewHomeServiceService } from './artist-new-home-service.service';
import { EditArtistProfileService } from '../edit-artist-profile/edit-artist-profile.service';

@Component({
  selector: 'app-artist-new-home',
  templateUrl: './artist-new-home.component.html',
  styleUrl: './artist-new-home.component.css',
})
export class ArtistNewHomeComponent implements OnInit {
  public userData: any = {};
  private socialAccounts: any[] = [];
  public artworks: any = [];
  router: any;
  public artworksCount: number = 0;
  private rank: number = 0;
  numberOfFollowers: number = 0;
  artistId: string = localStorage.getItem('user_id') || '';
  loading = false;
  availableArtworksCount: number = 0;
  NumberOfSales:string='';


  // artistsData: Artist[] = [];

  constructor(
    private artistServices: ArtistNewHomeServiceService,
    ArtistCreationsService: ArtistCreationsService,
    artistEdit: EditArtistProfileService
  ) {}

  changeRating(newRating: number): void {
    this.userData.AverageRating = newRating;
  }

  ngOnInit(): void {
    this.loadArtistData();
    this.loadArtworks();
    this.loadArtworksCount();
    this.getAvailableArtworkCount();

    console.log('artist data in home component', this.userData);
  }

  // getAvailableArtworkCount(): void {
  //   this.artistServices.getAvailableArtworkCount(this.artistId).subscribe(
  //     data => {
  //       this.availableArtworksCount = data.availableArtworks;
  //     },
  //     error => {
  //       console.error('Error fetching available artworks count:', error);
  //     }
  //   );
  // }

  getAvailableArtworkCount(): void {
    this.artistServices.getAvailableArtworkCount(this.artistId).subscribe(
      (data) => {
        this.availableArtworksCount = data.availableArtworks;
        console.log('Available Artworks Count:', this.availableArtworksCount);
      },
      (error) => {
        console.error('Error fetching available artworks count:', error);
      }
    );
  }

  loadArtistData(): void {
    this.artistServices
      .getArtistDetail(this.artistId)
      .subscribe((data: any) => {
        this.userData = data.artistData[0];
        console.log('userDataaaaaaaaaaaaaaaaa', this.userData);
        this.numberOfFollowers = this.userData.NumberOfFollowers;
        this.socialAccounts = data.socialAccounts;
        this.rank = data.rank.featured;
        this.userData.AverageRating = 3.5;
        this.NumberOfSales=this.userData.NumberOfSales;
        

        //this.artworks.reverse();
      });
  }

  loadArtworks(): void {
    this.artistServices
      .getArtworksForArtist(this.artistId)
      .subscribe((data: any) => {
        this.artworks = data;
        data.forEach((e: any) => {
          console.log(e.artwork_id);
          let id = this.getArtworkLikes(e.artwork_id);
          console.log(id);
        });
        //console.log("Artworks: ", data);
      });
  }

  getArtworkLikes(artId: number): void {
    this.artistServices.getLikeCountForArtwork(artId).subscribe((data: any) => {
      return data[0].count;
    });
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
    this.artistServices
      .getArtworksCountForArtist(this.artistId)
      .subscribe((data: any) => {
        this.artworksCount = data.count;
      });
  }

  // deleteArtwork(artId: number): void {
  //   this.artistServices.deleteArtwork(artId).subscribe(() => {
  //     this.loadArtworks();
  //   })
  // }

  updateArtwork(artId: number, artwork: any): void {
    this.artistServices.updateArtwork(artId, artwork).subscribe(() => {
      this.loadArtworks();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.loading
    ) {
      this.loadArtistData(); // Load more data
    }
  }
}

//************************* */ here is for artist creations make by me
