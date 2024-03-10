import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css'
})
export class ArtistCardComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {

  }
  @Input() artist: any ;


  formatLikeCount(likeCount: number): string {
    if (likeCount < 1000) {
      return likeCount.toString();
    } else if (likeCount < 1000000) {
      return (likeCount / 1000).toFixed(1) + 'K';
    } else {
      return (likeCount / 1000000).toFixed(1) + 'M';
    }
  }

  formatCrationCount(creationCount:number):string{
    if (creationCount < 1000) {
      return creationCount.toString();
    }else if (creationCount < 1000000) {
      return (creationCount / 1000).toFixed(1) + 'K';
    } else {
      return (creationCount / 1000000).toFixed(1) + 'M';
    }
  }
}
