import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent  {


  @Input() artist: any ;
 
  
  constructor(private router: Router) { }
 
  

 

  formatCrationCount(creationCount:number):string{
    if (creationCount < 1000) {
      return creationCount.toString();
    }else if (creationCount < 1000000) {
        return (creationCount / 1000).toFixed(1) + 'K';
      } else {
        return (creationCount / 1000000).toFixed(1) + 'M';
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
