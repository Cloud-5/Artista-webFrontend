import { Component, OnInit } from '@angular/core';
import { ArtistPortfolioService } from './artist-portfolio-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-artist-portfolio',
  templateUrl: './artist-portfolio.component.html',
  styleUrls: ['./artist-portfolio.component.css'],
})
export class ArtistPortfolioComponent implements OnInit {
  public ratingForm: FormGroup;
  artistData: any = {};
  artistCreations: any[] = [];
  rating3: number;

  ngOnInit(): void {
    const artistId = 1;
    this.getArtistDetails(artistId);
    this.getArtistCreations(artistId);
  }
  

  constructor(
    public artistportfolioService: ArtistPortfolioService,
    private fb: FormBuilder
  ) {
    this.rating3 = 0;
    this.ratingForm = this.fb.group({
      rating: ['', Validators.required],
      feedback: [''],
    });
  }

  getArtistDetails(artistId: number): void {
    this.artistportfolioService.getArtistDetails(artistId).subscribe(
      (data: any[]) => {
        console.log(data[0]);
        this.artistData = data[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getArtistCreations(artistId: number): void {
    // Renamed method
    this.artistportfolioService.getArtistCreations(artistId).subscribe(
      (data: any[]) => {
        console.log(data);
        this.artistCreations = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

onSubmit(): void {
  const ratingValue = this.ratingForm.value.rating;
  const feedbackValue = this.ratingForm.value.feedback;
  console.log("Rating:", ratingValue);
  console.log("Feedback:", feedbackValue);
  // You can proceed to submit the form data or perform any other actions here
}



}
