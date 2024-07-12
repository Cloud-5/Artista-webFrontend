import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  public form: FormGroup;
  rating3: number;

  constructor(private fb: FormBuilder,  private afMessaging: AngularFireMessaging){
    this.rating3 = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    });
  }

}
