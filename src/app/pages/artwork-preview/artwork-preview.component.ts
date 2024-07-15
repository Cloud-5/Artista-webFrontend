import { Component,OnInit,HostListener,Input,SimpleChanges,OnDestroy, AfterViewInit} from '@angular/core';
import { ArtworkPreviewService } from './artwork-preview.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CartItemService } from '../../shared/cards/arts/arts.service';
import { ArtServiceService } from '../home/service/art-service.service';
import { AlertService } from '../../shared/services/alert.service';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-artwork-preview',
  templateUrl: './artwork-preview.component.html',
  styleUrl: './artwork-preview.component.css',
})
export class ArtworkPreviewComponent implements OnInit,OnDestroy {

  userId: string = localStorage.getItem('user_id') || '';
  userRole: string = localStorage.getItem('role') || '';
  artistRole: string = localStorage.getItem('role') || '';
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
  thumbnail: string = '';
  imageUrl: string = '';
  bg:string='';
  customer_profile_photo: string = '';
  relatedLike:boolean = false;
  TotalComments: number = 0;
  routeSub: Subscription | undefined;
  artsData: any = {};
  dataLoaded: boolean = false;
  isFavorite: boolean = false;
  showStickyBar: boolean = false;
  isDescriptionCollapsed = false;
  isTagsCollapsed = false;
  isSmallScreen = false;
  columns: any[][] = [[], [], []];
  currentIndex = 0;
  itemWidth = 25;
  gap = 16;
  private destroy$ = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private cartItemService: CartItemService,
    private artworkService: ArtworkPreviewService,
    private router: Router,
    private ArtServiceService: ArtServiceService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.artworkId = params['artworkId'];
      this.initializeComponent();
    });
  }

  ngAfterViewInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeComponent(): void {
    this.loadArtworkDetails(this.artworkId, this.userId);
    this.updateButtonStates();
    this.checkScreenSize();
    this.updateColumns();
    this.updateItemWidth();
    this.getArtwork();
  }

  private handleError(error: any, message: string): void {
    console.error(message, error);
    this.alertService.showMessage(message, false, error.message);
  }

  private setLoading(isLoading: boolean): void {
    this.dataLoaded = !isLoading;
  }

  get backgroundImage(): string {
    return `url('${this.thumbnail}')`;
  }

  getArtwork(): void {
    this.ArtServiceService.getArtwork().pipe(takeUntil(this.destroy$)).subscribe(
      (data: any[]) => {
        console.log(data);
        this.artsData = data;
        this.dataLoaded = true;
        this.setLoading(false);
      },
      (error: any) => {
        this.handleError(error, 'Error fetching artwork');
        this.setLoading(false);
      }
    );
  }

  oncommentsCount(count: number): void {
    this.TotalComments = count;
  }

  loadArtworkDetails(artworkId: string, userId: string): void {
    this.artworkService.getArtworkDetails(artworkId, userId).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.artworkDetails = data.artworkDetails[0];
        this.bestArtworks = data.bestArtworks;
        this.relatedArtworks = data.relatedArtworks[0];
        this.initializeArtworkDetails();
      },
      error => this.handleError(error, 'Error fetching artwork details')
    );
  }

  private initializeArtworkDetails(): void {
    this.artistId = this.artworkDetails.artist_id;
    this.imageUrl = this.artworkDetails.url_link;
    this.bg = this.artworkDetails.background;
    this.thumbnail = this.artworkDetails.thumbnail;
    this.customer_profile_photo = this.artworkDetails.customer_profile_photo;
    this.is3D = this.artworkDetails.category === '3D Modeling';
    this.tags = this.artworkDetails.tags || '';
    this.tagsArray = this.tags.split(',');
    this.isFavorite = this.artworkDetails.is_liked;
    this.isFollowing = this.artworkDetails.is_following;
    this.isAddedToGallery = this.artworkDetails.is_addedToGallery;
    this.updateButtonStates();
    this.updateColumns();
  }

  updateButtonStates(): void {
    this.followButtonText = this.isFollowing ? 'Following' : 'Follow';
    this.followButtonClass = this.isFollowing ? 'following' : 'follow';
    this.addToGalleryButtonText = this.isAddedToGallery ? 'Added to Gallery' : 'Add to Gallery';
    this.addToGalleryButtonClass = this.isAddedToGallery ? 'added-to-gallery' : 'add-to-gallery';
  }

  toggleFavorite() {
    const action = this.isFavorite ? this.artworkService.unlike(this.artworkId, this.userId) : this.artworkService.toggleLike(this.artworkId, this.userId);
    action.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.isFavorite = !this.isFavorite;
        this.artworkDetails.total_likes += this.isFavorite ? 1 : -1;
      },
      error => this.handleError(error, this.isFavorite ? 'Error unliking artwork' : 'Error liking artwork')
    );
  }

  toggleFollow(): void {
    const action = this.isFollowing ? this.artworkService.unfollow(this.artistId, this.userId) : this.artworkService.toggleFollow(this.artistId, this.userId);
    action.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.isFollowing = !this.isFollowing;
        this.followButtonText = this.isFollowing ? 'Following' : 'Follow';
        this.followButtonClass = this.isFollowing ? 'following' : 'follow';
        this.artworkDetails.followers_count += this.isFollowing ? 1 : -1;
      },
      error => this.handleError(error, this.isFollowing ? 'Error unfollowing artist' : 'Error following artist')
    );
  }

  toggleAddToGallery(): void {
    const action = this.isAddedToGallery ? this.artworkService.removeFromGallery(this.artworkId, this.userId) : this.artworkService.toggleAddToGallery(this.artworkId, this.userId);
    action.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.isAddedToGallery = !this.isAddedToGallery;
        this.addToGalleryButtonText = this.isAddedToGallery ? 'Added to Gallery' : 'Add to Gallery';
        this.addToGalleryButtonClass = this.isAddedToGallery ? 'added-to-gallery' : 'add-to-gallery';
      },
      error => this.handleError(error, this.isAddedToGallery ? 'Error removing from gallery' : 'Error adding to gallery')
    );
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

  updateColumns() {
    console.log('related is here');
    const width = window.innerWidth;

    let numColumns = 3;
    if (width < 600) {
      numColumns = 1;
    } else if (width < 992) {
      numColumns = 2;
    }

    this.columns = Array.from({ length: numColumns }, () => []);
    this.relatedArtworks.forEach((image, index) => {
      console.log('image',image, index % numColumns)
      this.columns[index % numColumns].push(image);
    });
  }

  addCart(art: any) {
    console.log('art', art);

    this.cartItemService.addItem(this.userId, Number(this.artworkId))
      .subscribe(
        response => {
          console.log('Item added to cart:', response);
        },
        error => {
          console.error('Error adding item to cart:', error);
          this.alertService.showMessage('Error adding item to cart', false, error.message);
        }
      );
    }
  addCart2(art: any) {
      console.log('art', art);
  
      this.cartItemService.addItem(this.userId, art.artwork_id)
        .subscribe(
          response => {
            console.log('Item added to cart:', response);
          },
          error => {
            console.error('Error adding item to cart:', error);
            this.alertService.showMessage('Error adding item to cart', false, error.message);
          }
        );
    }
  
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

    toggleFavorite1(image:any) {
      if(image.is_liked){
        this.artworkService.unlike(image.artwork_id, this.userId).subscribe(
          ()=> {
            image.is_liked = false;
            image.like_count -= 1;
          },
          (error)=> {
            console.error('Error unliking artwork:', error);
          }
        )
      } else {
        this.artworkService.toggleLike(image.artwork_id, this.userId).subscribe(
          ()=> {
            image.is_liked = true;
            image.like_count += 1;
          },
          (error)=> {
            console.error('Error liking artwork:', error);
          }
        )
      }
    }

    goToPortfolio() {
      this.router.navigate(['/artist-portfolio', this.artistId]);
      console.log('artist', this.artistId);
    }

    searchTag(tag: string){
      this.router.navigate(['/search-art'], { queryParams: { q: tag } });
    }

    searchCategory(categoryId:number){
      console.log('Category ID:', categoryId);
      this.router.navigate(['/search-art'], { queryParams: { category_id: categoryId } });  
    }
}



