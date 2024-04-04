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
  rating: any[]; // Update this based on your actual data structure
  total_creations: any[]; // Update this based on your actual data structure
}
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit{

  artistsData: any[]= [];
  

  constructor(private artistService: ArtistServiceService) { }
  
  ngOnInit(): void {
    this.loadArtistData();
  }

  loadArtistData(): void{
    this.artistService.getArtist().subscribe((data: any[]) => {
      console.log('Artist data: ', data);
      this.artistsData = data;
      this.filteredArtists = this.artistsData; 
    }, (error) => {
      console.error('Error fetching artist data: ', error);
    });
  }
  
  
    

  filteredArtists: Artist[] = this.artistsData;

  searchByKeyword(searchKeyword: string): void {
    // this line is for Converting searchKeyword to lowercase for case-insensitive search
    searchKeyword = searchKeyword.toLowerCase().trim();

    if (searchKeyword === '') {
      // If searchKeyword is empty, display all artists
      this.filteredArtists = this.artistsData;
    } else {
      // Filter artists based on searchKeyword
      this.filteredArtists = this.artistsData.filter(artist =>
        artist.username.toLowerCase().includes(searchKeyword) ||
        artist.profession.toLowerCase().includes(searchKeyword) ||
        artist.location.toLowerCase().includes(searchKeyword)
      );
    }
    console.log('Filtered Artists after filtering:', this.filteredArtists);
  }
  

}
