import { CreationsService } from './creations.service';
import { Component ,Input} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrl: './creations.component.css'
})
export class CreationsComponent {
  @Input() artworks: any;
  // @Input() deleteArtwork: any;
  artistId: string = localStorage.getItem('user_id') || '';
  artwork_id:number = 0;
  artistRole: string = localStorage.getItem('role') || '';
  constructor(private router: Router,private creation:CreationsService){}




  deleteArtwork(artworkId: number): void {
    if (confirm('Are you sure you want to mark this artwork as unavailable?')) {
      this.creation.putArtworkAvailability(artworkId).subscribe(
        response => {
          console.log(response.message);
          // Optionally update the UI to reflect the change
        },
        error => {
          console.error('Error marking artwork as unavailable:', error);
        }
      );
    }
  }



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
  viewArtwork(artworkId: string) {
    this.router.navigate(['/preview', this.artworks.artwork_id]);
  }
  ngOnInit(): void {


  }



}
