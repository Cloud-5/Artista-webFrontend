import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FollowingArtistsServiceService } from './following-artists-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following-artists',
  templateUrl: './following-artists.component.html',
  styleUrls: ['./following-artists.component.css']
})
export class FollowingArtistsComponent implements OnInit {

  FollowingArtistsData: any[] = [];
  filteredArtists: any[] = [];
  artistId: string = '';
  userId: string = localStorage.getItem('user_id') || '';

  @Output() unfollowArtist = new EventEmitter<void>();

  constructor(
    public followingArtistsService: FollowingArtistsServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFollowingArtistsList(this.userId);
  }

  getFollowingArtistsList(userId: string): void {
    this.followingArtistsService.getFollowingArtistsList(userId).subscribe(
      (data: any) => {
        this.FollowingArtistsData = data;
        this.filteredArtists = this.FollowingArtistsData;
        console.log('FollowingArtistsData:', this.FollowingArtistsData);
        console.log('FilteredArtists:', this.filteredArtists);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();
    if (searchKeyword === '') {
      this.filteredArtists = this.FollowingArtistsData;
    } else {
      this.filteredArtists = this.FollowingArtistsData.filter((artist) =>
        artist.fName.toLowerCase().includes(searchKeyword) ||
        artist.LName.toLowerCase().includes(searchKeyword) ||
        artist.profession.toLowerCase().includes(searchKeyword)
      );
    }
  }

  unfollow(artistId: string): void {
    console.log('Unfollowing artist with ID:', artistId);
    console.log('Current FollowingArtistsData:', this.FollowingArtistsData);

    this.followingArtistsService.unfollow(artistId, this.userId).subscribe(
      (response: any) => {
        console.log(response.message);
        this.getFollowingArtistsList(this.userId);

        this.FollowingArtistsData = this.FollowingArtistsData.filter(artist => artist.artistId !== artistId);
        this.filteredArtists = this.filteredArtists.filter(artist => artist.artistId !== artistId);


        this.unfollowArtist.emit();

        console.log('Updated FollowingArtistsData:', this.FollowingArtistsData);
        console.log('Updated filteredArtists:', this.filteredArtists);
      },
      (error: any) => {
        console.log('Error unfollowing artist:', error);
      }
    );
  }

  goToPortfolio(user_id: string) {
    this.router.navigate(['/artist-portfolio', user_id]);
  }
}
