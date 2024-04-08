import { Component, OnInit } from '@angular/core';
import { FeedbackListService } from './feedback-list.service';

@Component({
  selector: 'app-feedback-list-card',
  templateUrl: './feedback-list-card.component.html',
  styleUrls: ['./feedback-list-card.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: any[] = [];

  constructor(private FeedbackListService: FeedbackListService) { }

  ngOnInit(): void {
    this.loadFeedbackList();
  }

  loadFeedbackList() {
    this.FeedbackListService.getFeedbackList(1)
      .subscribe((data: any[]) => {
        this.feedbackList = data;
        //console.log('Feedback list:', this.feedbackList);
      }, (error: any) => {
        console.error('Error fetching feedback list:', error);
      });
  }
}
