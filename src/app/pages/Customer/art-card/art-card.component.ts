import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtCardServiceService } from './art-card-service.service';

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrls: ['./art-card.component.css']
})
export class ArtCardComponent {
  @Input() art: any;
  @Input() showRemoveButton: boolean = false;
  @Input() customerUserId!: string;

  @Output() removeGalleryItem = new EventEmitter<void>();

  constructor(private artCardService: ArtCardServiceService) {}

  formatLikeCount(likeCount: number): string {
    if (likeCount < 1000) {
      return likeCount.toString();
    } else if (likeCount < 1000000) {
      return (likeCount / 1000).toFixed(1) + 'K';
    } else {
      return (likeCount / 1000000).toFixed(1) + 'M';
    }
  }

  removeFromGallery() {
    console.log('art',this.art);
    this.artCardService.removeGalleryItem(this.customerUserId, this.art.artwork_id).subscribe
    (response => {
        this.removeGalleryItem.emit();
        console.log(response.message);
        // Optionally remove the artwork from the UI or refresh the gallery
      }, error => {
        console.error('Error removing artwork from gallery:', error);
      });
  }
}
