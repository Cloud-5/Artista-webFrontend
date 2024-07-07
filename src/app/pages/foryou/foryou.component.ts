import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ForyouServiceService } from './foryou-service.service';

@Component({
  selector: 'app-foryou',
  templateUrl: './foryou.component.html',
  styleUrls: ['./foryou.component.css']
})
export class ForyouComponent implements OnInit {

  artsData: any[] = [];
  userId: string = localStorage.getItem('user_id') || '';

  currentPage: number = 1;
  pageSize: number = 20;
  loading: boolean = false;
  allDataLoaded: boolean = false;

  constructor(private foryouService: ForyouServiceService) { }

  ngOnInit(): void {
     this.fetchArtworks();
  
  }

  fetchArtworks(): void {
    
    if (this.loading || this.allDataLoaded) return; // Prevent multiple simultaneous requests

    this.loading = true;
    console.log(`Fetching artworks for page ${this.currentPage}`);
    this.foryouService.fetchAll(this.userId, this.currentPage, this.pageSize)
      .subscribe(
        (data: any) => {
          console.log(`Received artworks for page ${this.currentPage}:`, data);
          if (data.artworks.length === 0) {
            console.log('All data loaded');
            this.allDataLoaded = true; // No more data to load
          } else {
            this.artsData = [...this.artsData, ...data.artworks]; // Append new data to existing artworks
            this.currentPage++; // Move to the next page for the next request
            console.log(`Artworks loaded, now on page ${this.currentPage}`);
          }
          this.loading = false;
        },
        error => {
          console.error('Error fetching artworks:', error);
          this.loading = false;
        }
      );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.fetchArtworks();
    }
  }
}
