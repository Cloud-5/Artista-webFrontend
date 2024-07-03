import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  notifications: any[] = [
    { id: 1, profilePic: '../../../../assets/imgs/profile1.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 2, profilePic: '../../../../assets/imgs/profile3.png', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 3, profilePic: '../../../../assets/imgs/profile4.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 4, profilePic: '../../../../assets/imgs/profile4.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 5, profilePic: '../../../../assets/imgs/profile4.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 6, profilePic: '../../../../assets/imgs/profile4.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 7, profilePic: '../../../../assets/imgs/profile4.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true },
    { id: 8, profilePic: '../../../../assets/imgs/profile4.jpeg', message: "Hi Guys, I' am anna kim I am from united states, I am 24 years old", time: '1m ago', unread: true }
  ];
  box: HTMLElement | null = null;
  down: boolean = true;
  
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  searchTerm: string = ''; // Added property to store search term
artist: { firebase_uid: string; artist_name: string; } | undefined;
  constructor(private router: Router) {}
  



  ngOnInit(): void {
    this.box = document.getElementById('box');
    this.countUnreadMessages();
    this.artist = {
      firebase_uid: 'someFirebaseUid',
      artist_name: 'Artist Name'
    };
  }

  toggleNotiFi() {
    if (this.down) {
      if (this.box) {
        this.box.style.height = '0px';
        this.box.style.opacity = '0';
      }
      this.down = false;
    } else {
      if (this.box) {
        this.box.style.height = '510px';
        this.box.style.opacity = '1';
      }
      this.down = true;
    }
  }

  
  



 


toggleNotification(){
  this.notificationComponent.toggleNotiFi();
}

countUnreadMessages(): number|any{
return this.notifications.filter(notification=>notification.unread=false);
}

markAllAsRead(): void {
this.notifications.forEach(notification => notification.unread = false);
}

clearAllNotifications(): void {
  this.notifications = [];
  // Optionally, perform additional actions like making an API call to clear notifications on the server
}


messageArtist(firebase_uid: string, artistName: string): void {
  // Save the firebase_uid to local storage
  localStorage.setItem('artistFirebaseUid', firebase_uid);
  localStorage.setItem('artistName', artistName);
  // Navigate to the chat route
  this.router.navigate(['/chat']);
}



// Method to handle search form submission
onSearchSubmit(): void {
  if (this.searchTerm.trim()) {
    this.router.navigate(['/search-art'], { queryParams: { q: this.searchTerm } });
  }
}

}

