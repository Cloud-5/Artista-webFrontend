import { Component,OnInit } from '@angular/core';
import { FollowingArtistsServiceService } from './following-artists-service.service';


@Component({
  selector: 'app-following-artists',
  templateUrl: './following-artists.component.html',
  styleUrl: './following-artists.component.css'
})
export class FollowingArtistsComponent implements OnInit{

  FollowingArtistsData: any[] = [];

  constructor(
    public followingArtistsService: FollowingArtistsServiceService
  ){}

  ngOnInit(): void {
    this.getFollowingArtistsList();
  }

  getFollowingArtistsList(): void {
    this.followingArtistsService.getFollowingArtistsList().subscribe(
      (data: any) => {
        this.FollowingArtistsData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
