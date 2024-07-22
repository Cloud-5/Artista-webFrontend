import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtistPortfolioService } from './artist-portfolio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { notificationService } from '../../../shared/layout/new-nav-bar/new-nav-bar.service';

@Component({
  selector: 'app-artist-portfolio',
  templateUrl: './artist-portfolio.component.html',
  styleUrls: ['./artist-portfolio.component.css'],
})
export class ArtistPortfolioComponent implements OnInit {
  public ratingForm: FormGroup;
  public feedbackForm: FormGroup;
  artistData: any = {};
  artistCreations: any[] = [];
  filteredArts: any[] = [];
  customerId: string = localStorage.getItem('user_id') || '';
  @Output() artistId: string = '';
  isFollowing: boolean = false;
  followButtonText: string = "Follow";
  followButtonClass: string = "follow";
  rating: number = 0;
  socialMediaLinks: any[] = [];
  CurrentcustomerId: string = localStorage.getItem('user_id') || '';

  routeSub: Subscription | undefined;

  constructor(
    private artistPortfolioService: ArtistPortfolioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService:notificationService
  ) {
    this.ratingForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
    this.feedbackForm = this.fb.group({
      feedback: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe( params => {
      this.artistId = params['user_id'];
      this.getArtistDetails(this.artistId);
      this.getArtistCreations(this.artistId);


    })

  }

  getArtistDetails(artistId: string): void {
    this.artistPortfolioService.getArtistDetails(artistId, this.CurrentcustomerId).subscribe(
      (data: any) => {
        this.artistData = data.artistDetails[0];
        this.socialMediaLinks = data.social;
        this.isFollowing = this.artistData.is_following;
        this.updateFollowButton();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getArtistCreations(artistId: string): void {
    this.artistPortfolioService.getArtistCreations(artistId).subscribe(
      (data: any[]) => {
        this.artistCreations = data;
        this.filteredArts = this.artistCreations;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();
    if (searchKeyword === '') {
      this.filteredArts = this.artistCreations;
    } else {
      this.filteredArts = this.artistCreations.filter((art) =>
        art.artwork_name.toLowerCase().includes(searchKeyword) ||
        art.artist_name.toLowerCase().includes(searchKeyword)
      );
    }
  }

  toggleFollow(): void {
    if (this.isFollowing) {
      this.artistPortfolioService.unfollow(this.artistId.toString(), this.customerId.toString()).subscribe(
        (response) => {
          console.log(response);
          this.isFollowing = false;
          this.updateFollowButton();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.artistPortfolioService.toggleFollow(this.artistId.toString(), this.customerId.toString()).subscribe(
        (response) => {
          console.log(response);
          this.isFollowing = true;
          this.updateFollowButton();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateFollowButton() {
    if (this.isFollowing) {
      this.followButtonText = "Following";
      this.followButtonClass = "following";
    } else {
      this.followButtonText = "Follow";
      this.followButtonClass = "follow";
    }
  }

  onSubmitFeedback() {
    if (this.feedbackForm.valid) {
      const feedback = this.feedbackForm.get('feedback')?.value;
      this.artistPortfolioService.submitFeedback(this.artistId, feedback, this.customerId).subscribe(
        response => {

          //start
          const notificationBody = `You have a new feedback`;

          const notification = {
            sender_id: this.customerId,
            receiver_id: this.artistId,
            source: 'Feedback',
            title: 'New Feedback Received',
            body: notificationBody,
            isViewed: false
          };

          this.notificationService.createNotification(notification).subscribe(
            response => {
              console.log(response);
            }, error => {
              console.error(error);
            }
          )
          //end
          console.log(response);
          alert('Feedback submitted successfully!');
        },
        error => {
          console.error(error);
          alert('An error occurred while submitting feedback.');
        }
      );
    }
  }

  onSubmitRating() {
    if (this.ratingForm.valid) {
      const ratingValue = this.ratingForm.get('rating')?.value;
      this.artistPortfolioService.submitRating(this.artistId, ratingValue, this.customerId).subscribe(
        response => {
          console.log(response);
          alert('Rating submitted successfully!');
        },
        error => {
          console.error(error);
          alert('An error occurred while submitting rating.');
        }
      );
    }
  }

  onStarClick(star: number): void {
    this.rating = star;
    this.ratingForm.patchValue({ rating: star });
  }

  messageArtist(firebase_uid: string, artistName: string): void {
    // Save the firebase_uid to local storage
    localStorage.setItem('artistFirebaseUid', firebase_uid);
    localStorage.setItem('artistName', artistName);
    // Navigate to the chat route
    this.router.navigate(['/chat']);
  }

}

