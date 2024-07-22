import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../components/notification/notification.component';
import { notificationService } from './new-nav-bar.service';


@Component({
  selector: 'app-new-nav-bar',
  templateUrl: './new-nav-bar.component.html',
  styleUrl: './new-nav-bar.component.css',
})
export class NewNavBarComponent {
  notifications: any[] = [];
  box: HTMLElement | null = null;
  down: boolean = true;
  userRole: string = localStorage.getItem('role') || '';



  @ViewChild(NotificationComponent)
  notificationComponent!: NotificationComponent;
  searchTerm: string = ''; // Added property to store search term
  userId:string='';

  constructor(private router: Router, private notificationService:notificationService) {}
  artist: { firebase_uid: string; artist_name: string } | undefined;
 //notifications:any[] = [];



  // toggleNotification() {
  //   this.notificationComponent.toggleNotiFi();
  // }

  ngOnInit(): void {
    console.log('Im in new nav bar')
    this.box = document.getElementById('box');
    this.userId = localStorage.getItem('user_id') || '';

    console.log('user role',this.userRole);
    // this.countUnreadMessages();
    this.artist = {
      firebase_uid: 'someFirebaseUid',
      artist_name: 'Artist Name',
    };
    this.getAllNotifications();
  }

  onSearchSubmit(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-art'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }

  messageArtist(firebase_uid: string, artistName: string): void {
    // Save the firebase_uid to local storage
    localStorage.setItem('artistFirebaseUid', firebase_uid);
    localStorage.setItem('artistName', artistName);
    // Navigate to the chat route
    this.router.navigate(['/chat']);
  }

  getAllNotifications(){
    this.notificationService.getNotifications(this.userId).subscribe(
      (data: any[]) => {
        console.log('notidfi',data)
        this.notifications = data;
      }, (error:any)=>{
        console.error('error getting notifications',error);
      }
    )
  }




}
