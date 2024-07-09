import { Component, OnInit, Input } from '@angular/core';
import { FeedbackListService } from './feedback-list.service';

@Component({
  selector: 'app-feedback-list-card',
  templateUrl: './feedback-list-card.component.html',
  styleUrls: ['./feedback-list-card.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: any[] = [];
  @Input () artistId: string='';

  constructor(private FeedbackListService: FeedbackListService) { }

  ngOnInit(): void {
    this.loadFeedbackList();
  }

  loadFeedbackList() {
    console.log('artistId:==================', this.artistId);
    this.FeedbackListService.getFeedbackList(this.artistId)
      .subscribe((data: any[]) => {
        this.feedbackList = data;
      }, (error: any) => {
        console.error('Error fetching feedback list:', error);
      });
  }
}
