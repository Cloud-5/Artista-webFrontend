import { Component, OnInit } from '@angular/core';
import { ArtistPortfolioService } from './artist-portfolio-service.service';
@Component({
  selector: 'app-artist-portfolio',
  templateUrl: './artist-portfolio.component.html',
  styleUrls: ['./artist-portfolio.component.css']
})
export class ArtistPortfolioComponent implements OnInit {

  artistData: any = {};
  artistCreations: any[] = [];

  ngOnInit(): void {
    const artistId = 1;
    this.getArtistDetails(artistId);
    this.getArtistCreations(artistId);
  }


  constructor(
   public artistportfolioService: ArtistPortfolioService
  ) { }

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

  getArtistCreations(artistId: number): void { // Renamed method
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
}
