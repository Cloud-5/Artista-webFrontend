import {
  Component,
  OnInit,
  HostListener,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ArtworkPreviewService } from './artwork-preview.service';
import { ActivatedRoute } from '@angular/router';
import { CommentInterface } from '../../shared/interfaces/comment.interface';

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
export class ArtworkPreviewComponent implements OnInit {
  userId: string = '1';
  artworkId: string = '3';
  artistId: string = '';
  is3D: boolean = true;
  artworkDetails: any = {};
  tags: string = '';
  tagsArray: string[] = [];

  isFollowing: boolean = false;
  followButtonText: string = '';
  followButtonClass: string = '';

  isAddedToGallery: boolean = false;
  addToGalleryButtonText: string = 'Add to Gallery';
  addToGalleryButtonClass: string = 'add-to-gallery';

  imageUrl: string =
    'https://test-artista.s3.ap-south-1.amazonaws.com/ford/scene.gltf';

  //@Input() comments: CommentInterface[] = [];

  TotalComments: number = 0;

  constructor(
    // private route: ActivatedRoute,
    private artworkService: ArtworkPreviewService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //     this.artworkId = params['id'];
    //     this.loadArtworkDetails(this.artworkId);
    // })
    this.loadArtworkDetails(this.artworkId, this.userId);
    if (this.isFollowing) {
      this.followButtonText = 'Following';
      this.followButtonClass = 'following';
    } else {
      this.followButtonText = 'Follow';
      this.followButtonClass = 'follow';
    }
    if (this.isAddedToGallery) {
      this.addToGalleryButtonText = 'Added to Gallery';
      this.addToGalleryButtonClass = 'added-to-gallery';
    } else {
      this.addToGalleryButtonText = 'Add to Gallery';
      this.addToGalleryButtonClass = 'add-to-gallery';
    }
    this.checkScreenSize();
  }

  oncommentsCount(count: number): void {
    this.TotalComments = count;
  }

  loadArtworkDetails(artworkId: string, userId: string): void {
    this.artworkService.getArtworkDetails(artworkId, userId).subscribe(
      (data: any) => {
        this.artworkDetails = data.artworkDetails[0];
        this.tags = this.artworkDetails.tags;
        this.tagsArray = this.tags.split(',');
        this.isFavorite = this.artworkDetails.is_liked;
        this.isFollowing = this.artworkDetails.is_following;
        this.artistId = this.artworkDetails.artist_id;
        this.isAddedToGallery = this.artworkDetails.is_addedToGallery;
      },
      (error) => {
        console.error('Error fetching artwork details:', error);
      }
    );
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
}
