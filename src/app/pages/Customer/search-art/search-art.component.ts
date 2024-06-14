import { Component, OnInit } from '@angular/core';
import { SearchArtService } from './search-art.service';


@Component({
  selector: 'app-search-art',
  templateUrl: './search-art.component.html',
  styleUrls: ['./search-art.component.css'],
})
export class SearchArtComponent implements OnInit {
  artsData: any[] = [];
  filteredArts: any[] = [];
  selectedOption: string = 'name-asc';

  constructor(private searchArtService: SearchArtService) {}

  ngOnInit(): void {
    this.getAllArtworks();
  }

  getAllArtworks(): void {
    this.searchArtService.getAllArtworks().subscribe(
      (data: any[]) => {
        this.artsData = data.map((artwork: any) => ({
          artwork_image_url: artwork.artwork_image_url,
          artwork_name: artwork.artwork_name,
          artwork_price: artwork.artwork_price,
          artist_name: artwork.artist_name,
          total_likes: artwork.total_likes,
        }));
        this.filteredArts = this.artsData;
        this.sortArts();
        console.log(this.filteredArts);
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
      this.filteredArts = this.artsData;
    } else {
      this.filteredArts = this.artsData.filter((art) =>
        art.artwork_name.toLowerCase().includes(searchKeyword) ||
        art.artist_name.toLowerCase().includes(searchKeyword)
      );
    }
    this.sortArts();
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption = value;
    this.sortArts();
  }

  sortArts(): void {
    switch (this.selectedOption) {
      case 'name-asc':
        this.filteredArts.sort((a, b) => a.artwork_name.localeCompare(b.artwork_name));
        break;
      case 'name-desc':
        this.filteredArts.sort((a, b) => b.artwork_name.localeCompare(a.artwork_name));
        break;
      case 'date-asc':
        this.filteredArts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        this.filteredArts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'price-asc':
        this.filteredArts.sort((a, b) => a.artwork_price - b.artwork_price);
        break;
      case 'price-desc':
        this.filteredArts.sort((a, b) => b.artwork_price - a.artwork_price);
        break;
      default:
        break;
    }
  }
}
