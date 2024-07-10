import { CreationsService } from './creations.service';
import { Component ,Input} from '@angular/core';



@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrl: './creations.component.css'
})
export class CreationsComponent {
  @Input() artworks: any;
  @Input() deleteArtwork: any;
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

  handleDelete() {
    if (this.deleteArtwork) {
      this.deleteArtwork(this.artworks.artwork_id);
    }
  }





}
