import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrl: './arts.component.css'
})
export class ArtsComponent  {

  @Input() art: any;

  constructor(){}
  
  formatLikeCount(likeCount: number): string {
    if (likeCount < 1000) {
      return likeCount.toString();
    } else if (likeCount < 1000000) {
      return (likeCount / 1000).toFixed(1) + 'K';
    } else {
      return (likeCount / 1000000).toFixed(1) + 'M';
    }
  }


}
