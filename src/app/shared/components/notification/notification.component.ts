import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
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
  showNotifications: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.box = document.getElementById('box');
    this.countUnreadMessages();
  }

  toggleNotifications() {
    // if (this.down) {
    //   if (this.box) {
    //     this.box.style.height = '0px';
    //     this.box.style.opacity = '0';
    //   }
    //   this.down = false;
    // } else {
    //   if (this.box) {
    //     this.box.style.height = '510px';
    //     this.box.style.opacity = '1';
    //   }
    //   this.down = true;
    // }
    this.showNotifications = !this.showNotifications;

  }
countUnreadMessages(): number|any{
  return this.notifications.filter(notification=>notification.unread=false);
}

markAllAsRead(): void {
  this.notifications.forEach(notification => notification.read = true);
}

clearAll(): void {
    this.notifications = [];
    // Optionally, perform additional actions like making an API call to clear notifications on the server
  }
}




