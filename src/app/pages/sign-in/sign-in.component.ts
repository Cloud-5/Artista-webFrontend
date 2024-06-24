import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './Service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  signIn() {
    if (this.loginForm?.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (email && password) {
        this.authService.login(email, password).subscribe(
          (response: any) => {
            console.log(response);
            // Decode the JWT token
            const decodedToken: any = jwtDecode(response.accessToken);
            // Store the uid and role in local storage
            localStorage.setItem('uid', decodedToken.uid);
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('user_id', response.data.user_id);

           console.log('decodedToken',decodedToken);
            // Navigate based on role
            if (decodedToken.role === 'artist') {
              this.router.navigate(['/']);
            } else {
             console.log('decodedToken.uid',decodedToken.uid);
              this.authService.checkPreferences(response.data.user_id).subscribe(
                (prefResponse: any) => {
                  console.log('Preferences response', prefResponse);
                  if (prefResponse.hasPreferences) {
                    this.router.navigate(['/foryou']);
                  } else {
                    this.router.navigate(['/firstforyou']);
                  }
                },
                (prefError: any) => {
                  console.error('Error checking preferences', prefError);
                  // this.router.navigate(['/firstforyou']); // Default to firstforyou on error
                }
              );
            }
          },
          (error: any) => {
            console.error('Login failed', error);
            // Handle failed login here
          }
        );
        console.log(email, password);
      } else {
        console.error('Email or password is null');
      }
    }
  }
}
