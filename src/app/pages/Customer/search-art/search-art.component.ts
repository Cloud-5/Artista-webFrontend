import { Component } from '@angular/core';

interface Art {
  artImgUrl: string;
  artworkName: string;
  artCategory: string;
  price: number;
  artistName: string;
  likeCount: number;
}

@Component({
  selector: 'app-search-art',
  templateUrl: './search-art.component.html',
  styleUrl: './search-art.component.css',
})
export class SearchArtComponent {

  artsData = [
    { artImgUrl: 'assets/imgs/pixelart.png', artworkName: 'Pixel Pioneers', artCategory: 'pixelart', price: 120, artistName: 'Sophie Clarke', likeCount: 1980 },
    { artImgUrl: 'assets/imgs/DigitalPainting.jpeg', artworkName: 'Galactic Groove', artCategory: 'digital', price: 260, artistName: 'Chloe Foster', likeCount: 4400 },
    { artImgUrl: 'assets/imgs/art15.jpeg', artworkName: 'Eternal man', artCategory: 'motionart', price: 250, artistName: 'Benjamin Adams', likeCount: 4200 },
    { artImgUrl: 'assets/imgs/generativeArts.jpg', artworkName: 'Digital Eden', artCategory: 'generativeart', price: 190, artistName: 'Aria Nguyen', likeCount: 3600 },
    { artImgUrl: 'assets/imgs/graphicDesign.jpg', artworkName: 'Cityscape Symphony', artCategory: 'graphicdesign', price: 170, artistName: 'Elijah Roberts', likeCount: 2900 },
    { artImgUrl: 'assets/imgs/3d.png', artworkName: 'Enchanted Forest', artCategory: '3D', price: 180, artistName: 'Luna Wang', likeCount: 3120 },
    { artImgUrl: 'assets/imgs/3DModeling.jpeg', artworkName: 'Pioneers edge', artCategory: '3D', price: 120, artistName: 'Sophie Clarke', likeCount: 1980 },
    { artImgUrl: 'assets/imgs/digitalIllustrations.jpg', artworkName: 'Mystic Mountains', artCategory: 'digital', price: 150, artistName: 'Emma Turner', likeCount: 2350 },
    { artImgUrl: 'assets/imgs/3DIMG.jpg', artworkName: 'Cosmic Dream', artCategory: '3D', price: 220, artistName: 'Jackson Lee', likeCount: 4100 },
    { artImgUrl: 'assets/imgs/vectorArt.jpg', artworkName: 'Neon Nights', artCategory: 'vectorart', price: 200, artistName: 'Max Cooper', likeCount: 2750 },
    { artImgUrl: 'assets/imgs/art16.jpeg', artworkName: 'Digital Eden', artCategory: 'generativeart', price: 190, artistName: 'Aria Nguyen', likeCount: 3600 },
    { artImgUrl: 'assets/imgs/motionArt.png', artworkName: 'Eternal robot', artCategory: 'motionart', price: 250, artistName: 'Benjamin Adams', likeCount: 4200 },
    { artImgUrl: 'assets/imgs/generativeArts.jpg', artworkName: 'Digital Eden', artCategory: 'generativeart', price: 190, artistName: 'Aria Nguyen', likeCount: 3600 },
    { artImgUrl: 'assets/imgs/art17.jpeg', artworkName: 'Eternal galaxy', artCategory: 'motionart', price: 250, artistName: 'Benjamin Adams', likeCount: 4200 },
    { artImgUrl: 'assets/imgs/pixel1.png', artworkName: 'Pixel Artist', artCategory: 'pixelart', price: 120, artistName: 'Sophie Clarke', likeCount: 1980 },
  ];
  filteredArts: Art[] = this.artsData; // Initialize filteredArts with all arts
art: any;

  searchByKeyword(searchKeyword: string): void {
    // Convert searchKeyword to lowercase for case-insensitive search
    searchKeyword = searchKeyword.toLowerCase().trim();

    if (searchKeyword === '') {
      // If searchKeyword is empty, display all arts
      this.filteredArts = this.artsData;
    } else {
      // Filter arts based on searchKeyword
      this.filteredArts = this.artsData.filter(art =>
        art.artworkName.toLowerCase().includes(searchKeyword) || // Search by artwork name
        art.artCategory.toLowerCase().includes(searchKeyword) || // Search by art category
        art.artistName.toLowerCase().includes(searchKeyword) // Search by artist name (if available)
      );
    }
  }
}
