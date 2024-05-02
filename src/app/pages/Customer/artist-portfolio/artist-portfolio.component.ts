import { Component, OnInit } from '@angular/core';
import { ArtistPortfolioService } from './artist-portfolio-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-artist-portfolio',
  templateUrl: './artist-portfolio.component.html',
  styleUrls: ['./artist-portfolio.component.css'],
})
export class ArtistPortfolioComponent implements OnInit {
  public ratingForm: FormGroup;
  artistData: any = {};
  artistCreations: any[] = [];
  rating3: number;
  filteredArts: any[] = [];
  customerId:number = 1;

  artistId: string = "1";
  userId: string = "1";

  isFollowing: boolean = false;
  followButtonText: string = "";
  followButtonClass: string = "";

  ngOnInit(): void {
    const artistId = 1;
    this.getArtistDetails(artistId);
    this.getArtistCreations(artistId);
    if(this.isFollowing){
      this.followButtonText = "Following";
      this.followButtonClass = "following";
    } else {
      this.followButtonText = "Follow";
      this.followButtonClass = "follow";
    }
  }


  constructor(
    public artistportfolioService: ArtistPortfolioService,
    private fb: FormBuilder
  ) {
    this.rating3 = 0;
    this.ratingForm = this.fb.group({
      rating: ['', Validators.required],
      feedback: [''],
    });
  }

  getArtistDetails(artistId: number): void {
    this.artistportfolioService.getArtistDetails(artistId).subscribe(
      (data: any[]) => {
        this.artistData = data[0];
        this.isFollowing = this.artistData.is_following;
        console.log(this.artistData.is_following);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getArtistCreations(artistId: number): void {
    // Renamed method
    this.artistportfolioService.getArtistCreations(artistId).subscribe(
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
    console.log(searchKeyword);

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
        this.artistportfolioService.unfollow(this.artistId, this.userId).subscribe(() => {
            console.log('Following artist', this.artistId, 'as user', this.userId)
            this.isFollowing = false;
            this.followButtonText = "Follow";
            this.followButtonClass = "follow";
        }, (error) => {
            console.error('Error unfollowing artist:', error);
        });
    } else {
        this.artistportfolioService.toggleFollow(this.artistId, this.userId).subscribe(() => {
            console.log('Following artist', this.artistId, 'as user', this.userId)
            this.isFollowing = true;
            this.followButtonText = "Following";
            this.followButtonClass = "following";
        }, (error) => {
            console.error('Error following artist:', error);
        });
    }
}




}
