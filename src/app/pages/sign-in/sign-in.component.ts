
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup; // Corrected variable name from LoginForm to loginForm
  email: any;
  password: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [""], // Corrected lowercase naming convention for consistency
      password: [""]
    });
  }

  ngOnInit(): void {

  }

  signIn() { // Renamed signForm to signIn for clarity
    console.log("LoginForm", this.loginForm.value); // Corrected variable name to match
  }
}
