

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent implements OnInit {
  loginForm: FormGroup| any ;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm && this.loginForm.valid) {
      console.log('Form submitted successfully!');
      // You can add further logic here, such as calling a service to handle form submission
    } else {
      console.log('Form invalid. Please fill all required fields correctly.');
    }
  }
}
