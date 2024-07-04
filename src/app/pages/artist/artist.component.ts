import { Component, OnInit, HostListener } from '@angular/core';
import { ArtistServiceService } from '../artist/artist-service.service';

interface Artist {
  user_id: number;
  username: string;
  email: string;
  description: string;
  location: string;
  fName: string;
  LName: string;
  profile_photo_url: string;
  banner_img_url: string;
  profession: string;
  rating: number;
  total_creations: number;
  featured: number;
}

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistsData: Artist[] = [];
  currentPage = 0; // Initial page number for pagination
  pageSize = 10; // Number of items to fetch per page
  loading = false; // Flag to track if data is currently being loaded
  searchKeyword = ''; // Search keyword for artist names
  selectedProfession = ''; // Selected profession for filtering
  selectedLocation = ''; // Selected location for filtering
 selectedFeatured: number | null = null; 
  sortBy = ''; // Sort by field
  allDataLoaded: boolean = false;
  locations: string[] = []; 


  constructor(private artistService: ArtistServiceService) { }

  ngOnInit(): void {
    this.loadArtistData();
    this.fetchLocations();
  }
   
  fetchLocations(): void {
    this.artistService.getLocations()
      .subscribe(
        (locations: any[]) => {
          this.locations = locations.map(location => location.location); // Extracting 'location' field
          console.log('Locations:', this.locations);
        },
        error => {
          console.error('Error fetching locations:', error);
        }
      );
  }
  
  
  loadArtistData(): void {
    if (this.loading || this.allDataLoaded) return; // Prevent multiple simultaneous requests
    this.loading = true;

    // Prepare query parameters
    const params: any = {
      page: this.currentPage,
      limit: this.pageSize
    };

    if (this.searchKeyword) params.searchKeyword = this.searchKeyword;
    if (this.selectedProfession) params.profession = this.selectedProfession;
    if (this.selectedLocation) params.location = this.selectedLocation;
    if (this.selectedFeatured !== null) params.featured = this.selectedFeatured; // Add featured filter
    if (this.sortBy) params.sortBy = this.sortBy;

    console.log(`Fetching artists with params:`, params);

    // Call service to fetch artists
    this.artistService.getArtists(params)
      .subscribe((data: Artist[]) => {
        console.log(`Received artists for page ${this.currentPage}:`, data);
        if (data.length === 0) {
          console.log('All data loaded');
          this.allDataLoaded = true; // No more data to load
        } else {
          this.artistsData = [...this.artistsData, ...data]; // Append new data to existing artists
          this.currentPage++; // Move to the next page for the next request
          console.log(`Artists loaded, now on page ${this.currentPage}`);
        }
        this.loading = false;
      }, (error) => {
        console.error('Error fetching artist data: ', error);
        this.loading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loading) {
    
      this.loadArtistData(); // Load more data
    }
  }

  // Function to handle search
  onSearch(): void {
    this.currentPage = 0; // Reset page number when searching
    this.artistsData = []; // Clear current data
    this.allDataLoaded = false; // Reset data loaded flag
    this.loadArtistData(); // Reload data based on new search
  }

  // Function to handle profession filter
  onFilterByProfession(): void {
    this.currentPage = 0;
    this.artistsData = [];
    this.allDataLoaded = false;
    this.loadArtistData();
  }

  // Function to handle location filter
  onFilterByLocation(): void {
    this.currentPage = 0;
    this.artistsData = [];
    this.allDataLoaded = false;
    this.loadArtistData();
  }
  onFilterByFeatured(): void {
    this.currentPage = 0;
    this.artistsData = [];
    this.allDataLoaded = false;
    this.loadArtistData();
  }
 

  
  // Function to handle sorting
  onSortBy(): void {
    this.currentPage = 0;
    this.artistsData = [];
    this.allDataLoaded = false;
    this.loadArtistData();
  }

}
