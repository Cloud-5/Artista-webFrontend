import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrl: './art-card.component.css'
})
export class ArtCardComponent {

  @Input() art: any;
  @Input() showRemoveButton: boolean = false; // Add this line

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

