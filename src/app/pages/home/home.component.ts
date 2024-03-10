import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {

  }
  artistsData = [
    
    { 
    
      artistImgUrl: "../assets/images/profile1.jpg",
      artistName: "Alexandra Digitalis",
      proffesionStatus: "Digital Illustrator",
      location: "New York, USA",
      likeCount:  2345,
      creationCount: 78
    },
    { 
     
      artistImgUrl: "../assets/images/profile2.png",
      artistName: "Michael Pixelson",
      proffesionStatus: "Pixel Artist",
      location: "Los Angeles, USA",
      likeCount: 4321,
      creationCount: 56
    },
    { 
    
      artistImgUrl: "../assets/images/profile3.jpg",
      artistName: "Elena Vectoria",
      proffesionStatus: "Vector Illustrator",
      location: "London, UK",
      likeCount:  5678,
      creationCount: 34
    },
    { 
     
      artistImgUrl: "../assets/images/profile4.jpg",
      artistName: "David Graphicson",
      proffesionStatus: "Graphic Designer",
      location: "Paris, France",
      likeCount:  7890,
      creationCount: 12
    },
    { 
     
      artistImgUrl: "../assets/images/profile5.jpg",
      artistName: "Sophie Animatrix",
      proffesionStatus: "Digital Animator",
      location: "Tokyo, Japan",
      likeCount:  9876,
      creationCount: 90
    },
    { 
      
      artistImgUrl: "../assets/images/profile6.jpg",
      artistName: "Kevin Gamez",
      proffesionStatus: "Game Artist",
      location: "San Francisco, USA",
      likeCount:  5432,
      creationCount: 67
    },
    { 
      
      artistImgUrl: "../assets/images/profile7.jpg",
      artistName: "Linda Digidream",
      proffesionStatus: "Digital Dreamer",
      location: "Berlin, Germany",
      likeCount:  8765,
      creationCount: 45
    },
    { 
     
      artistImgUrl: "../assets/images/profile8.jpg",
      artistName: "Benjamin VR",
      proffesionStatus: "Virtual Reality Artist",
      location: "Sydney, Australia",
      likeCount:  1234,
      creationCount: 23
    },
    { 
      
      artistImgUrl: "../assets/images/profile9.jpg",
      artistName: "Mia Cinematics",
      proffesionStatus: "Cinematic Illustrator",
      location: "Toronto, Canada",
      likeCount:  4321,
      creationCount: 78
    },
    { 
     
      artistImgUrl: "../assets/images/profile10.jpg",
      artistName: "Peter Pixel",
      proffesionStatus: "Pixel Painter",
      location: "Amsterdam, Netherlands",
      likeCount:  9876,
      creationCount: 56
    },
    { 
      
      artistImgUrl: "../assets/images/profile11.jpg",
      artistName: "Nina Digitalheart",
      proffesionStatus: "Digital Painter",
      location: "Seoul, South Korea",
      likeCount:  3456,
      creationCount: 34
    },
    { 
 
      artistImgUrl: "../assets/images/profile12.jpg",
      artistName: "Leo VR",
      proffesionStatus: "Virtual Reality Designer",
      location: "São Paulo, Brazil",
      likeCount:  6543,
      creationCount: 12
    },
  
  
  
];

artsData = [
  { artImgUrl: '../assets/images/digitalIllustrations.jpg', artworkName: 'Mystic Mountains', price: 150, artistName: 'Emma Turner', likeCount: 2350 },
  { artImgUrl: '../assets/images/3DIMG.jpg', artworkName: 'Cosmic Dream', price: 220, artistName: 'Jackson Lee', likeCount: 4100 },
  { artImgUrl: '../assets/images/3d.png', artworkName: 'Enchanted Forest', price: 180, artistName: 'Luna Wang', likeCount: 3120 },
  { artImgUrl: '../assets/images/vectorArt.jpg', artworkName: 'Neon Nights', price: 200, artistName: 'Max Cooper', likeCount: 2750 },
  { artImgUrl: '../assets/images/pixelart.png', artworkName: 'Pixel Pioneers', price: 120, artistName: 'Sophie Clarke', likeCount: 1980 },
  { artImgUrl: '../assets/images/motionArt.png', artworkName: 'Eternal Waves', price: 250, artistName: 'Benjamin Adams', likeCount: 4200 },
  { artImgUrl: '../assets/images/generativeArts.jpg', artworkName: 'Digital Eden', price: 190, artistName: 'Aria Nguyen', likeCount: 3600 },
  { artImgUrl: '../assets/images/graphicDesign.jpg', artworkName: 'Cityscape Symphony', price: 170, artistName: 'Elijah Roberts', likeCount: 2900 },
  { artImgUrl: '../assets/images/digicol.jpg', artworkName: 'Vivid Visions', price: 210, artistName: 'Isabella Hill', likeCount: 3950 },
  { artImgUrl: '../assets/images/digitalIllustrations.jpg', artworkName: 'Celestial Serenade', price: 140, artistName: 'Oscar White', likeCount: 2400 },
  { artImgUrl: '../assets/images/3DIMG.jpg', artworkName: 'Aurora Reverie', price: 230, artistName: 'Ava Brown', likeCount: 4300 },
  { artImgUrl: '../assets/images/3d.png', artworkName: 'Mythical Meadows', price: 190, artistName: 'Milo Taylor', likeCount: 3250 },
  { artImgUrl: '../assets/images/vectorArt.jpg', artworkName: 'Techno Jungle', price: 210, artistName: 'Nora King', likeCount: 2850 },
  { artImgUrl: '../assets/images/pixelart.png', artworkName: 'Retro Radiance', price: 130, artistName: 'James Chen', likeCount: 2070 },
  { artImgUrl: '../assets/images/motionArt.png', artworkName: 'Galactic Groove', price: 260, artistName: 'Chloe Foster', likeCount: 4400 },
  { artImgUrl: '../assets/images/generativeArts.jpg', artworkName: 'Artificial Arcadia', price: 200, artistName: 'Liam Murphy', likeCount: 3750 }
];


}
