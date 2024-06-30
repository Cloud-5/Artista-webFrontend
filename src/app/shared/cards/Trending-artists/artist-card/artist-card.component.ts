import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css'
})
export class ArtistCardComponent implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {

  }
  @Input() artist: any ;

  formatFollowerCount(followerCount: number): string {
    if (followerCount == null || followerCount == undefined) {
      return '0';
    }
    
    if (followerCount < 1000) {
      return followerCount.toString();
    } else if (followerCount < 1000000) {
      return (followerCount / 1000).toFixed(1) + 'K';
    } else {
      return (followerCount / 1000000).toFixed(1) + 'M';
    }
  }
  messageArtist(firebase_uid: string, artistName: string): void {
    // Save the firebase_uid to local storage
    localStorage.setItem('artistFirebaseUid', firebase_uid);
    localStorage.setItem('artistName', artistName);
    // Navigate to the chat route
    this.router.navigate(['/chat']);
  }
}
