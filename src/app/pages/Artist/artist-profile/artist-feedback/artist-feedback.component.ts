import { NewNavBarComponent } from './../../../../shared/layout/new-nav-bar/new-nav-bar.component';
// import { Component, OnInit } from '@angular/core';
// import { ArtistFeedbackService } from './artist-feedback.service';
// import { error } from 'console';

// @Component({
//   selector: 'app-artist-feedback',
//   templateUrl: './artist-feedback.component.html',
//   styleUrls: ['./artist-feedback.component.css']
// })
// export class ArtistFeedbackComponent implements OnInit {
//   feedbacks: any[] = [];
//   feedbacks2: any[] = [];
//   artistId: string = localStorage.getItem('user_id') || '';
//   isLiked:boolean=false;

//   constructor(private artistFeedbackService: ArtistFeedbackService) {}

//   ngOnInit(): void {
//    this.getFeedbacks();
//     this.loadFeedback();

//   }

//   loadFeedback(): void {
//     const artistId = this.artistId; // Set the artistId you want to fetch feedback for

//     this.artistFeedbackService.getFeedbackForArtist(artistId).subscribe(
//       data => {
//         this.feedbacks = data;

//         // console.log('Feedbackssss:', this.feedbacks);
//       },
//       error => {
//         console.error('Error fetching feedback:', error);
//       }
//     );
//   }



//   getFeedbacks(){
//     const artistId =this.artistId;
//     this.artistFeedbackService.getFeedbacks(artistId).subscribe(data=>{
//       this.feedbacks2=data;
//       console.log('feeeeeeeeeeeeeeeeeeeeeeeeeeeedback 222222',data[0].isLiked)
//     },
//     error=>{
//       console.log('error fetching feedback',error)
//     }
//   )

//   };
//   likeFeedback(feedbackId: string): void {
//     this.artistFeedbackService.likeFeedback(feedbackId).subscribe(
//       response => {
//         console.log('Feedback liked successfully:', response);
//        this.isLiked=true;
//         this.loadFeedback();
//       },
//       error => {
//         console.error('Error liking feedback:', error);
//       }
//     );
//   }

//   unlikeFeedback(feedbackId: string): void {
//     this.artistFeedbackService.unlikeFeedback(feedbackId).subscribe(
//       response => {
//         console.log('Feedback unliked successfully:', response);
//         this.isLiked=true;
//         this.loadFeedback();
//       },
//       error => {
//         console.error('Error unliking feedback:', error);
//       }
//     );
//   }




// }



import { Component, OnInit } from '@angular/core';
import { ArtistFeedbackService } from './artist-feedback.service';
import { notificationService } from '../../../../shared/layout/new-nav-bar/new-nav-bar.service';


@Component({
  selector: 'app-artist-feedback',
  templateUrl: './artist-feedback.component.html',
  styleUrls: ['./artist-feedback.component.css']
})
export class ArtistFeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  artistId: string = localStorage.getItem('user_id') || '';
  customerId: string ='';

  constructor(private artistFeedbackService: ArtistFeedbackService,private notificationService:notificationService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    const artistId = this.artistId; // Set the artistId you want to fetch feedback for

    this.artistFeedbackService.getFeedbackForArtist(artistId).subscribe(
      data => {
        this.feedbacks = data;
        console.log('Feedbacks:', this.feedbacks);
      },
      error => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  likeFeedback(feedbackId: string, customer_user_id:string): void {
    this.artistFeedbackService.likeFeedback(feedbackId).subscribe(
      response => {
          const notificationBody = `Artist has liked your feedback`;

          const notification = {
            sender_id: this.artistId,
            receiver_id: customer_user_id,
            source: 'Feedback',
            title: 'Feedback Appriciated',
            body: notificationBody,
            isViewed: false
          };

          this.notificationService.createNotification(notification).subscribe(
            response => {
              console.log(response);
            }, error => {
              console.error(error);
            }
          )



        console.log('Feedback liked successfully:', response);
        const feedback = this.feedbacks.find(f => f.feedback_id === feedbackId);
        if (feedback) {
          feedback.isLiked = true;
        }
      },
      error => {
        console.error('Error liking feedback:', error);
      }
    );
  }

  unlikeFeedback(feedbackId: string, customer_user_id:string): void {
    this.artistFeedbackService.unlikeFeedback(feedbackId).subscribe(
      response => {
        console.log('Feedback unliked successfully:', response);
        const feedback = this.feedbacks.find(f => f.feedback_id === feedbackId);
        if (feedback) {
          feedback.isLiked = false;
        }
      },
      error => {
        console.error('Error unliking feedback:', error);
      }
    );
  }
}
