import { Component,OnInit,HostListener,Input,SimpleChanges,OnDestroy} from '@angular/core';
import {trigger,state,style,animate,transition,} from '@angular/animations';
import { ArtworkPreviewService } from './artwork-preview.service';
import { ActivatedRoute } from '@angular/router';
import { CommentInterface } from '../../shared/interfaces/comment.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItemService } from '../../shared/cards/arts/arts.service';

@Component({
  selector: 'app-artwork-preview',
  templateUrl: './artwork-preview.component.html',
  styleUrl: './artwork-preview.component.css',
  animations: [
    trigger('toggleFavorite', [
      state(
        'true',
        style({
          color: 'red', // Change color
        })
      ),
      state(
        'false',
        style({
          color: 'blue',
        })
      ),
      transition('true <=> false', [animate('0.5s')]),
    ]),
  ],
})
export class ArtworkPreviewComponent implements OnInit,OnDestroy {
  userId: string = '1';

  artworkId: string = '';
  artistId: string = '';
  is3D: boolean = false;
  artworkDetails: any = {};
  tags: string = '';
  tagsArray: string[] = [];
  bestArtworks: any[] = [];
  relatedArtworks: any[] = [];

  isFollowing: boolean = false;
  followButtonText: string = '';
  followButtonClass: string = '';

  isAddedToGallery: boolean = false;
  addToGalleryButtonText: string = 'Add to Gallery';
  addToGalleryButtonClass: string = 'add-to-gallery';

  imageUrl: string = '';

  //@Input() comments: CommentInterface[] = [];

  TotalComments: number = 0;
  routeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartItemService: CartItemService,
    private artworkService: ArtworkPreviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.artworkId = params['artworkId'];
      console.log('artworkId',this.artworkId);
      this.loadArtworkDetails(this.artworkId, this.userId); 
      this.updateButtonStates();
      this.checkScreenSize();
      this.updateColumns();
      this.updateItemWidth();
    })
  }

  ngOnDestroy(): void {
      if(this.routeSub){
        this.routeSub.unsubscribe();
      }
  }
  

  oncommentsCount(count: number): void {
    this.TotalComments = count;
  }

  loadArtworkDetails(artworkId: string, userId: string): void {
    this.artworkService.getArtworkDetails(artworkId, userId).subscribe(
      (data: any) => {
        this.artworkDetails = data.artworkDetails[0];
        this.bestArtworks = data.bestArtworks;
        this.relatedArtworks = data.relatedArtworks[0];
        console.log('related',this.relatedArtworks.length);
        this.artistId = this.artworkDetails.artist_id;
        this.imageUrl = this.artworkDetails.url_link;
        console.log('image',this.imageUrl);
        if(this.artworkDetails.category === '3D Modeling'){
          this.is3D = true;
        } else {
          this.is3D = false;
        }
        if (this.artworkDetails.tags) {
          this.tags = this.artworkDetails.tags;
          this.tagsArray = this.tags.split(',');
        } else {
          this.tags = '';
          this.tagsArray = [];
        }
        this.isFavorite = this.artworkDetails.is_liked;
        this.isFollowing = this.artworkDetails.is_following;
        this.isAddedToGallery = this.artworkDetails.is_addedToGallery;
        this.updateButtonStates();
      },
      (error) => {
        console.error('Error fetching artwork details:', error);
      }
    );
  }

  updateButtonStates(): void {
    this.followButtonText = this.isFollowing ? 'Following' : 'Follow';
    this.followButtonClass = this.isFollowing ? 'following' : 'follow';
    this.addToGalleryButtonText = this.isAddedToGallery ? 'Added to Gallery' : 'Add to Gallery';
    this.addToGalleryButtonClass = this.isAddedToGallery ? 'added-to-gallery' : 'add-to-gallery';
  }

  isFavorite: boolean = false;

  showStickyBar: boolean = false;

  toggleFavorite() {
    if (this.isFavorite) {
      this.artworkService.unlike(this.artworkId, this.userId).subscribe(
        () => {
          this.isFavorite = false;
          this.artworkDetails.total_likes -= 1;
        },
        (error) => {
          console.error('Error unliking artwork:', error);
        }
      );
    } else {
      this.artworkService.toggleLike(this.artworkId, this.userId).subscribe(
        () => {
          this.isFavorite = true;
          this.artworkDetails.total_likes += 1;
        },
        (error) => {
          console.error('Error liking artwork:', error);
        }
      );
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

  toggleAddToGallery(): void {
    if (this.isAddedToGallery) {
      this.artworkService
        .removeFromGallery(this.artworkId, this.userId)
        .subscribe(
          () => {
            this.isAddedToGallery = false;
            this.addToGalleryButtonText = 'Add to Gallery';
            this.addToGalleryButtonClass = 'add-to-gallery';
          },
          (error) => {
            console.error('Error removing from gallery:', error);
          }
        );
    } else {
      this.artworkService
        .toggleAddToGallery(this.artworkId, this.userId)
        .subscribe(
          () => {
            this.isAddedToGallery = true;
            this.addToGalleryButtonText = 'Added to Gallery';
            this.addToGalleryButtonClass = 'added-to-gallery';
          },
          (error) => {
            console.error('Error adding to gallery:', error);
          }
        );
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0;

    this.showStickyBar = scrollPosition > screenHeight;
  }

  isDescriptionCollapsed = false;
  isTagsCollapsed = false;
  isSmallScreen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
    this.updateColumns();
    this.updateItemWidth();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 991;
  }

  toggleCollapse(section: string): void {
    if (section === 'description') {
      this.isDescriptionCollapsed = !this.isDescriptionCollapsed;
    } else if (section === 'tags') {
      this.isTagsCollapsed = !this.isTagsCollapsed;
    }
  }

  viewArtwork(artworkId: string) {
    this.router.navigate(['/preview', artworkId]);
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

  addCart(art: any) {
    console.log('art', art);
    
    this.cartItemService.addItem(this.userId, art.artwork_id) // Replace '1' with the actual user_id
      .subscribe(
        response => {
          console.log('Item added to cart:', response);
        },
        error => {
          console.error('Error adding item to cart:', error);
        }
      );
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
  

}



