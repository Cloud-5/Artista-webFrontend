import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Messaging } from 'firebase/messaging';
import { mergeMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  rating3: number;

  constructor(private fb: FormBuilder,  private afMessaging: AngularFireMessaging){
    this.rating3 = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.requestPermission(); // Request permission on initialization
    this.afMessaging.messages.subscribe((message) => {
      console.log('Message received:', message);
      // Handle the received message here
    });

    this.afMessaging.messages.subscribe((message) => {
      console.log('Message received:', message);
      // Handle the received message here
    });

    // Handle token refresh
    this.afMessaging.requestToken
      .pipe(
        mergeMapTo(this.afMessaging.tokenChanges)
      )
      .subscribe(
        (token) => {
          console.log('Token refreshed:', token);
          // Handle the new token here
        },
        (error) => {
          console.log('Unable to retrieve token:', error);
        }
      );
  }

  requestPermission() {
    this.afMessaging.requestPermission.subscribe(
      () => {
        console.log('Permission granted!');
        // Handle successful permission grant
      },
      (error) => {
        console.log('Permission denied:', error);
        // Handle permission denied or error
      }
    );
  }
}
