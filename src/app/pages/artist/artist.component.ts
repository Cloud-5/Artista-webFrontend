import { Component, OnInit } from '@angular/core';
import { ArtistServiceService } from './artist-service.service';

interface Artist {
  user_id: number;
  username: string;
  email: string;
  description: string;
  location: string;
  fName: string;
  LName: string;
  profile_photo_url: string;
  banner_image_url: string | null;
  profession: string;
  rating: number;
  total_creations: number;
}

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistsData: Artist[] = [];
  filteredArtists: Artist[] = [];
  selectedProfession: string = '';
  selectedLocation: string = '';
  sortBy: string = '';
  searchKeyword: string = '';

  constructor(private artistService: ArtistServiceService) { }

  ngOnInit(): void {
    this.loadArtistData();
  }

  loadArtistData(): void {
    this.artistService.getArtist().subscribe((data: Artist[]) => {
      this.artistsData = data;
      this.applyFilters();
    }, (error) => {
      console.error('Error fetching artist data: ', error);
    });
  }

  searchByKeyword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchKeyword = inputElement.value.toLowerCase().trim();
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.artistsData;

    if (this.selectedProfession) {
      filtered = filtered.filter(artist => artist.profession === this.selectedProfession);
    }

    if (this.selectedLocation) {
      filtered = filtered.filter(artist => artist.location === this.selectedLocation);
    }

    if (this.searchKeyword) {
      filtered = filtered.filter(artist =>
        artist.fName.toLowerCase().includes(this.searchKeyword) ||
        artist.LName.toLowerCase().includes(this.searchKeyword) ||
        artist.profession.toLowerCase().includes(this.searchKeyword) ||
        artist.location.toLowerCase().includes(this.searchKeyword)
      );
    }

    this.filteredArtists = filtered;
    this.applySorting();
  }

  applySorting(): void {
    if (this.sortBy === 'rating') {
      this.filteredArtists.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'total_creations') {
      this.filteredArtists.sort((a, b) => b.total_creations - a.total_creations);
    }
    console.log('After sorting:', this.filteredArtists);
  }

  onProfessionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProfession = selectElement.value;
    this.applyFilters();
  }

  onLocationChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLocation = selectElement.value;
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    this.applyFilters();
  }
}
