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
  filteredArts: any[] = [];

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
        this.artistCreations = data;
        this.filteredArts = this.artistCreations;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();
    console.log(searchKeyword);

    if (searchKeyword === '') {
      this.filteredArts = this.artistCreations;
    } else {
      this.filteredArts = this.artistCreations.filter((art) =>
        art.artwork_name.toLowerCase().includes(searchKeyword) ||
        art.artist_name.toLowerCase().includes(searchKeyword)
      );
    }
  }




}
