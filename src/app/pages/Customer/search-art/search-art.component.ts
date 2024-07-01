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
  priceFilteredArts: any[] = []; // Array to store artworks filtered by price range
  selectedOption: string = 'name-asc';
  priceMin: number = 10;
  selectedPrice: number = 1000; // Initial value for max price

  constructor(private searchArtService: SearchArtService) {}

  ngOnInit(): void {
    this.getAllArtworks();
  }

  getAllArtworks(): void {
    this.searchArtService.getAllArtworks().subscribe(
      (data: any[]) => {
        this.artsData = data.map((artwork: any) => ({
          artwork_image_url: artwork.artwork_image_url,
          published_date: new Date(artwork.published_date), // Ensure it's a Date object
          artwork_name: artwork.artwork_name,
          artwork_price: artwork.artwork_price,
          artist_name: artwork.artist_name,
          total_likes: artwork.total_likes,
        }));
        this.filteredArts = this.artsData;
        this.applyFilters(''); // Apply initial filters with an empty keyword
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
    this.applyFilters(searchKeyword); // Apply filters with the current search keyword
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption = value;
    this.applyFilters('');
  }


  onPriceRangeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedPrice = parseInt(target.value);
    this.applyPriceRangeFilter();
  }

  applyPriceRangeFilter(): void {
    this.priceFilteredArts = this.artsData.filter(art =>
      art.artwork_price >= this.priceMin && art.artwork_price <= this.selectedPrice
    );
    this.applyFilters('');
  }

  applyFilters(searchKeyword: string): void {
    let tempFilteredArts = this.artsData;

    // Apply keyword filter if searchKeyword is provided
    if (searchKeyword) {
      searchKeyword = searchKeyword.toLowerCase().trim();
      tempFilteredArts = tempFilteredArts.filter(art =>
        art.artwork_name.toLowerCase().includes(searchKeyword) ||
        art.artist_name.toLowerCase().includes(searchKeyword)
      );
    }

    // Apply price range filter
    if (this.priceFilteredArts.length > 0) {
      tempFilteredArts = tempFilteredArts.filter(art =>
        this.priceFilteredArts.includes(art)
      );
    }

    // Update filteredArts with the combined filters
    this.filteredArts = tempFilteredArts;

    // Sort filtered artworks based on current sorting option
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
        this.filteredArts.sort((a, b) => a.published_date.getTime() - b.published_date.getTime());
        break;
      case 'date-desc':
        this.filteredArts.sort((a, b) => b.published_date.getTime() - a.published_date.getTime());
        break;
      case 'price-asc':
        this.filteredArts.sort((a, b) => a.artwork_price - b.artwork_price);
        break;
      case 'price-desc':
        this.filteredArts.sort((a, b) => b.artwork_price - a.artwork_price);
        break;
      case 'popularity-asc':
        this.filteredArts.sort((a, b) => a.total_likes - b.total_likes);
        break;
      case 'popularity-desc':
          this.filteredArts.sort((a, b) => b.total_likes - a.total_likes);
        break;
      default:
        break;
    }
  }
}

