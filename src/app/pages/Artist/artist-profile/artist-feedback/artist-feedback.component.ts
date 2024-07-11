import { Component, OnInit } from '@angular/core';
import { ArtistFeedbackService } from './artist-feedback.service';

@Component({
  selector: 'app-artist-feedback',
  templateUrl: './artist-feedback.component.html',
  styleUrls: ['./artist-feedback.component.css']
})
export class ArtistFeedbackComponent implements OnInit {
  feedbacks: any[] = [];

  constructor(private artistFeedbackService: ArtistFeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    const artistId = 'Ar-00001'; // Set the artistId you want to fetch feedback for
    this.artistFeedbackService.getFeedbackForArtist(artistId).subscribe(
      data => {
        this.feedbacks = data;
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }
}
