import { Component, OnInit } from '@angular/core';
import { messaging } from '../../configs/firebase.config';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  template: `
    <p>
      notification works!
    </p>
  `,
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    messaging.getToken({vapidKey: environment.firebaseConfig.vapidkey})
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  listen() {
    messaging.onMessage((incomingMessage) => {
      console.log(incomingMessage);
    })
  }

}
