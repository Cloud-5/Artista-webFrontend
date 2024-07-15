import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ForyouServiceService } from './foryou-service.service';
import { PreferencesService } from '../first-foryou/preferences.service';
import { Router } from '@angular/router';

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
  categoryData: any[] = [];

  constructor(private foryouService: ForyouServiceService,
    private preferencesService: PreferencesService,
    private router: Router  
  ) { }

  ngOnInit(): void {
     this.fetchArtworks();
     this.loadCategoryData();
  
  }
  loadCategoryData(): void {
    this.preferencesService.showPreferences().subscribe((data: any[]) => {
      console.log('Category data: ', data);
      console.log('Category data: ', data[0].category_id);


      this.categoryData = data;

    }, (error) => {
      console.error('Error fetching category data: ', error);
    });


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

  navigateToCategory(categoryId: string): void {
    console.log('Navigating to category:', categoryId);
    this.router.navigate(['/search-art'], { queryParams: { category_id: categoryId } });
  }
}
