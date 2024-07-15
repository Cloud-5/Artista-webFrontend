import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchArtService } from './search-art.service';

@Component({
  selector: 'app-search-art',
  templateUrl: './search-art.component.html',
  styleUrls: ['./search-art.component.css'],
})
export class SearchArtComponent implements OnInit {
  searchResults: any[] = [];
  originalSearchResults: any[] = []; // Add this line to store original search results
  categories: any[] = [];
  selectedCategories: string[] = [];
  selectedOption: string = 'name-asc';
  priceMin: number = 10;
  selectedPrice: number = 1000;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private searchArtService: SearchArtService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['category_id'];
      if (categoryId) {
        this.fetchArtworksByCategory(categoryId);
      }
      this.searchQuery = params['q'];
      if (this.searchQuery) {
        this.searchArtService.searchArtworks(this.searchQuery).subscribe(
          (results: any[]) => {
            this.searchResults = results;
            this.originalSearchResults = [...results]; // Store original results
            this.applyFilters();
          },
          (error: any) => {
            console.error('Error fetching search results:', error);
          }
        );
      } else {
      }
    });

    this.searchArtService.fetchCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();

    this.searchArtService.searchArtworks(searchKeyword).subscribe(
      (results: any[]) => {
        this.searchResults = results;
        this.originalSearchResults = [...results]; // Store original results
        this.applyFilters();
      },
      (error: any) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  updateCategoryFilter(event: any, categoryValue: string): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryValue);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== categoryValue);
    }
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption = value;
    this.applyFilters();
  }

  onPriceRangeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedPrice = parseInt(target.value);
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredResults = this.searchResults;

    if (this.selectedCategories.length > 0) {
      filteredResults = filteredResults.filter(art =>
        this.selectedCategories.includes(art.category_name)
      );
    } else {
      filteredResults = [...this.originalSearchResults]; // Reset to original results if no categories are selected
    }

    filteredResults = filteredResults.filter(
      art =>
        art.artwork_price >= this.priceMin &&
        art.artwork_price <= this.selectedPrice
    );

    this.sortArts(filteredResults);
  }

  sortArts(results: any[]): void {
    switch (this.selectedOption) {
      case 'name-asc':
        results.sort((a, b) => a.artwork_name.localeCompare(b.artwork_name));
        break;
      case 'name-desc':
        results.sort((a, b) => b.artwork_name.localeCompare(a.artwork_name));
        break;
      case 'date-asc':
        results.sort((a, b) => new Date(a.published_date).getTime() - new Date(b.published_date).getTime());
        break;
      case 'date-desc':
        results.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
        break;
      case 'price-asc':
        results.sort((a, b) => a.artwork_price - b.artwork_price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.artwork_price - a.artwork_price);
        break;
      case 'popularity-asc':
        results.sort((a, b) => a.total_likes - b.total_likes);
        break;
      case 'popularity-desc':
        results.sort((a, b) => b.total_likes - a.total_likes);
        break;
      default:
        break;
    }
    this.searchResults = results;
  }

  fetchArtworksByCategory(categoryId: string): void {
    this.searchArtService.searchArtworksByCategory(categoryId).subscribe(
      (results: any[]) => {
        this.searchResults = results;
        this.originalSearchResults = [...results]; // Store original results
        this.applyFilters();
      },
      (error: any) => {
        console.error('Error fetching artworks by category:', error);
      }
    );
  }
}
