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
  }
}
