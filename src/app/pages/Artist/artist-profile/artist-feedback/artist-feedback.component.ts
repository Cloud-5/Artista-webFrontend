import { Component, OnInit } from '@angular/core';
import { ArtistFeedbackService } from './artist-feedback.service';
import { error } from 'console';

@Component({
  selector: 'app-artist-feedback',
  templateUrl: './artist-feedback.component.html',
  styleUrls: ['./artist-feedback.component.css']
})
export class ArtistFeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  feedbacks2: any[] = [];
  artistId: string = localStorage.getItem('user_id') || '';

  constructor(private artistFeedbackService: ArtistFeedbackService) {}

  ngOnInit(): void {
   this.getFeedbacks();
    this.loadFeedback();
  }

  loadFeedback(): void {
    const artistId = this.artistId; // Set the artistId you want to fetch feedback for

    this.artistFeedbackService.getFeedbackForArtist(artistId).subscribe(
      data => {
        this.feedbacks = data;
        // console.log('Feedbackssss:', this.feedbacks);
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }



  getFeedbacks(){
    const artistId =this.artistId;
    this.artistFeedbackService.getFeedbacks(artistId).subscribe(data=>{
      this.feedbacks2=data;
      // console.log('feeeeeeeeeeeeeeeeeeeeeeeeeeeedback 222222',this.feedbacks2)
    },
    error=>{
      console.log('error fetching feedback',error)
    }
  )

  };





}
