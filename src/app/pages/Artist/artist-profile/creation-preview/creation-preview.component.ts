import { CreationsService } from './../creations/creations.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtworkPreviewService } from '../../../artwork-preview/artwork-preview.service';
import { ArtistNewHomeServiceService } from '../artist-new-home/artist-new-home-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creation-preview',
  templateUrl: './creation-preview.component.html',
  styleUrl: './creation-preview.component.css'
})
export class CreationPreviewComponent implements OnInit{
 artistId: string = localStorage.getItem('user_id') || '';
  public userData: any = {};
  private socialAccounts: any[] = [];
  public artworks: any = [];
  public artworksCount: number = 0;
  private rank:number = 0;
  showStickyBar: boolean = false;
  isFavorite: boolean = true;
  isTagsCollapsed = false;


  artworkId: string = '';

  is3D: boolean = false;
  artworkDetails: any = {};
  tags: string = '';
  tagsArray: string[] = [];
  bestArtworks: any[] = [];
  relatedArtworks: any[] = [];

  isFollowing: boolean = false;
  followButtonText: string = 'followbutton text';
  followButtonClass: string = 'folllowbutton class';

  isAddedToGallery: boolean = false;
  addToGalleryButtonText: string = 'Add to Gallery';
  addToGalleryButtonClass: string = 'add-to-gallery';
  userId: string = '1';

  imageUrl: string = '';
  isSmallScreen = false;
  isDescriptionCollapsed = false;
  TotalComments:number = 0;






  constructor(private artistServices: ArtistNewHomeServiceService,cretions:CreationsService,private artworkService:ArtworkPreviewService,private router: Router) { }


  changeRating(newRating: number): void {
    this.userData.AverageRating = newRating;
  }




  ngOnInit(): void {
    this.loadArtistData();
    this.loadArtworks();
    this.loadArtworksCount();;

  }
  toggleCollapse(section: string): void {
    if (section === 'description') {
      this.isDescriptionCollapsed = !this.isDescriptionCollapsed;
    } else if (section === 'tags') {
      this.isTagsCollapsed = !this.isTagsCollapsed;
    }
  }

  toggleFollow(): void {
    if (this.isFollowing) {
      this.artworkService.unfollow(this.artistId, this.userId).subscribe(
        () => {
          this.isFollowing = false;
          this.followButtonText = 'Follow';
          this.followButtonClass = 'follow';
          this.artworkDetails.followers_count -= 1;
        },
        (error) => {
          console.error('Error unfollowing artist:', error);
        }
      );
    } else {
      this.artworkService.toggleFollow(this.artistId, this.userId).subscribe(
        () => {
          this.isFollowing = true;
          this.followButtonText = 'Following';
          this.followButtonClass = 'following';
          this.artworkDetails.followers_count += 1;
        },
        (error) => {
          console.error('Error following artist:', error);
        }
      );
    }
  }
  viewArtwork(artworkId: string) {
    this.router.navigate(['/preview', artworkId]);
  }

  currentIndex = 0;
  itemWidth = 25;
  gap = 16;
  next() {
    if (this.currentIndex < this.bestArtworks.length - (100 / this.itemWidth)) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.bestArtworks.length - (100 / this.itemWidth);
    }
    this.updateCarousel();
  }

  updateCarousel() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const gapAdjustment = (this.gap / window.innerWidth) * 100;
    const translateValue = -(this.currentIndex * (this.itemWidth + gapAdjustment));
    carousel.style.transform = `translateX(${translateValue}%)`;
  }
  updateItemWidth() {
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
    this.updateCarousel();
  }

  oncommentsCount(count: number): void {
    this.TotalComments = count;
  }
  columns: any[][] = [[], [], []];

  updateColumns() {
    const width = window.innerWidth;

    let numColumns = 3;
    if (width < 600) {
      numColumns = 1;
    } else if (width < 992) {
      numColumns = 2;
    }

    this.columns = Array.from({ length: numColumns }, () => []);
    this.relatedArtworks.forEach((image, index) => {
      this.columns[index % numColumns].push(image);
    });
  }
  loadArtistData(): void {
    this.artistServices.getArtistDetail(this.artistId).subscribe((data: any) => {
      this.userData = data.artistData[0];
      this.socialAccounts = data.socialAccounts;
      this.rank = data.rank.featured;
      console.log("Artist Details:========================== ", this.userData);
      this.userData.AverageRating=4.5;

      //this.artworks.reverse();
    })
  }

  loadArtworks(): void {
    this.artistServices.getArtworksForArtist(this.artistId).subscribe((data: any) => {
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
    this.artistServices.getArtworksCountForArtist(this.artistId).subscribe((data: any) => {
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

}
