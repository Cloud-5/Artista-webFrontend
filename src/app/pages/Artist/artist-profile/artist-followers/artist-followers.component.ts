


import { Component, OnInit } from '@angular/core';
import { ArtistFollowersService } from './artist-followers.service';

@Component({
  selector: 'app-artist-followers',
  templateUrl: './artist-followers.component.html',
  styleUrls: ['./artist-followers.component.css']
})
export class ArtistFollowersComponent implements OnInit {
  followers: any[] = [];
  artistId: string = localStorage.getItem('user_id') || '';

  constructor(private followersService: ArtistFollowersService) { }

  ngOnInit(): void {
    this.loadFollowersData();


  }

  loadFollowersData() {
    this.followersService.getFollowersForArtist(this.artistId) // Replace 1 with actual artist id
      .subscribe((data: any) => {
        this.followers = data;
        console.log('this is follower data  from followers',this.followers[0].userId);
      });
  }

  // deleteFollower(followerId: number) {
  //   this.followersService.deleteFollower(followerId, 1) // replace 1 with actual artist id
  //     .subscribe(() => {
  //       this.loadFollowersData();
  //     });
  // }

//  deleteFollower1(followerId:string,artistId:string){
//    this.followersService.deleteFollowers(followerId)
//    .subscribe(()=>{
//      this.loadFollowersData();
//    })

//  }


  deleteFollower(followerId: string) {
    this.followersService.deleteFollowers(followerId,this.artistId) // replace 1 with actual artist id
      .subscribe(() => {
        console.log('this is artist id and follower Id from follower ts ');
        this.loadFollowersData();
      });
  }
}


