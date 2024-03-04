import { Component } from '@angular/core';
interface Artist {
  bannerImgUrl: string;
  artistImgUrl: string;
  artistName: string;
  proffesionStatus: string;
  location: string;
  likeCount: number;
  creationCount: number;
}
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  artistsData = [
    
      { 
        bannerImgUrl: "../assets/images/art1.jpg",
        artistImgUrl: "../assets/images/profile1.jpg",
        artistName: "Alexandra Digitalis",
        proffesionStatus: "Digital Illustrator",
        location: "New York, USA",
        likeCount:  2345,
        creationCount: 78
      },
      { 
        bannerImgUrl: "../assets/images/art2.jpg",
        artistImgUrl: "../assets/images/profile2.png",
        artistName: "Michael Pixelson",
        proffesionStatus: "Pixel Artist",
        location: "Los Angeles, USA",
        likeCount: 4321,
        creationCount: 56
      },
      { 
        bannerImgUrl: "../assets/images/art3.jpg",
        artistImgUrl: "../assets/images/profile3.jpg",
        artistName: "Elena Vectoria",
        proffesionStatus: "Vector Illustrator",
        location: "London, UK",
        likeCount:  5678,
        creationCount: 34
      },
      { 
        bannerImgUrl: "../assets/images/art4.jpg",
        artistImgUrl: "../assets/images/profile4.jpg",
        artistName: "David Graphicson",
        proffesionStatus: "Graphic Designer",
        location: "Paris, France",
        likeCount:  7890,
        creationCount: 12
      },
      { 
        bannerImgUrl: "../assets/images/art5.jpg",
        artistImgUrl: "../assets/images/profile5.jpg",
        artistName: "Sophie Animatrix",
        proffesionStatus: "Digital Animator",
        location: "Tokyo, Japan",
        likeCount:  9876,
        creationCount: 90
      },
      { 
        bannerImgUrl: "../assets/images/art6.jpg",
        artistImgUrl: "../assets/images/profile6.jpg",
        artistName: "Kevin Gamez",
        proffesionStatus: "Game Artist",
        location: "San Francisco, USA",
        likeCount:  5432,
        creationCount: 67
      },
      { 
        bannerImgUrl: "../assets/images/art7.jpg",
        artistImgUrl: "../assets/images/profile7.jpg",
        artistName: "Linda Digidream",
        proffesionStatus: "Digital Dreamer",
        location: "Berlin, Germany",
        likeCount:  8765,
        creationCount: 45
      },
      { 
        bannerImgUrl: "../assets/images/art8.jpg",
        artistImgUrl: "../assets/images/profile8.jpg",
        artistName: "Benjamin VR",
        proffesionStatus: "Virtual Reality Artist",
        location: "Sydney, Australia",
        likeCount:  1234,
        creationCount: 23
      },
      { 
        bannerImgUrl: "../assets/images/art9.jpg",
        artistImgUrl: "../assets/images/profile9.jpg",
        artistName: "Mia Cinematics",
        proffesionStatus: "Cinematic Illustrator",
        location: "Toronto, Canada",
        likeCount:  4321,
        creationCount: 78
      },
      { 
        bannerImgUrl: "../assets/images/art10.jpg",
        artistImgUrl: "../assets/images/profile10.jpg",
        artistName: "Peter Pixel",
        proffesionStatus: "Pixel Painter",
        location: "Amsterdam, Netherlands",
        likeCount:  9876,
        creationCount: 56
      },
      { 
        bannerImgUrl: "../assets/images/art11.jpg",
        artistImgUrl: "../assets/images/profile11.jpg",
        artistName: "Nina Digitalheart",
        proffesionStatus: "Digital Painter",
        location: "Seoul, South Korea",
        likeCount:  3456,
        creationCount: 34
      },
      { 
        bannerImgUrl: "../assets/images/art12.jpg",
        artistImgUrl: "../assets/images/profile12.jpg",
        artistName: "Leo VR",
        proffesionStatus: "Virtual Reality Designer",
        location: "São Paulo, Brazil",
        likeCount:  6543,
        creationCount: 12
      },
    
    
    
  ];
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
        artist.artistName.toLowerCase().includes(searchKeyword) ||
        artist.proffesionStatus.toLowerCase().includes(searchKeyword) ||
        artist.location.toLowerCase().includes(searchKeyword)
      );
    }
  }

}
