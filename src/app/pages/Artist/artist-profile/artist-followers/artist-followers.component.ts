import { Component, OnInit } from '@angular/core';
import { ArtistFollowersService } from './artist-followers.service';

@Component({
  selector: 'app-artist-followers',
  templateUrl: './artist-followers.component.html',
  styleUrls: ['./artist-followers.component.css']
})
export class ArtistFollowersComponent implements OnInit {
  followers: any[] = [];

  constructor(private followersService: ArtistFollowersService) { }

  ngOnInit(): void {
    this.loadFollowersData();
  }

  loadFollowersData() {
    this.followersService.getFollowersForArtists(1) // Replace 1 with actual artist id
      .subscribe((data: Object) => {
        this.followers = data as any[];
      });
  }

  deleteFollowers(followerId:number){
    this.followersService.deleteFollower(followerId,1) //replace 1 with actual artist id
    .subscribe(()=>{
     this.loadFollowersData();
    })
  }




}


