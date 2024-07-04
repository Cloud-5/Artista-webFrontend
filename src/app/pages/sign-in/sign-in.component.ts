
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './Service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

declare global {
  interface Window {
    grecaptcha: any;
    grecaptchaCallback: any;
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  Message: string | null = null;
  successMessage: string | null = null;
  recaptchaToken: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { Message: string };
    if (state) {
      this.successMessage = state.Message;
      this.showSuccessMessage();
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Wait for the reCAPTCHA to fully load and bind the callback
    window.grecaptchaCallback = this.recaptchaLoaded.bind(this);
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  recaptchaLoaded() {
    window.grecaptcha.render('recaptcha', {
      sitekey: '6Lc-0gQqAAAAAJij1oo6f5MHKhs67mj0gzar6ocw',
      callback: this.onRecaptchaSuccess.bind(this)
    });
  }

  onRecaptchaSuccess(token: string) {
    this.recaptchaToken = token;
  }

  showSuccessMessage() {
    setTimeout(() => {
      this.successMessage = null;
    }, 5000); // 5000 milliseconds = 5 seconds
  }
  signIn() {
    if (this.loginForm?.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email && password && this.recaptchaToken) {
        this.authService.login(email, password, this.recaptchaToken).subscribe(
          (response: any) => {
            // Decode the JWT token
            const decodedToken: any = jwtDecode(response.accessToken);
            // Store the uid and role in local storage
            localStorage.setItem('uid', decodedToken.uid);
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('firebase_uid', response.data.firebase_uid);
            //console.log('decodedToken', decodedToken);
            localStorage.setItem('accessToken', response.accessToken);

            // Navigate based on role
            if (decodedToken.role === 'artist') {
              this.router.navigate(['/Artist']);
            } else {
              this.authService.checkPreferences(response.data.user_id).subscribe(
                (prefResponse: any) => {
                 // console.log('Preferences response', prefResponse);
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
            if (error.status === 200) {
              this.errorMessage = 'Wait for Admin Approval';
            } else if (error.status === 404) {
              this.errorMessage = 'Invalid Credentials';
            } else {
              console.error('Login failed', error);
              this.errorMessage = 'An error occurred during login';
            }
          }
        );
        console.log(email, password, this.recaptchaToken);
      } else {
        this.errorMessage = 'Email, password or reCAPTCHA response is missing';
      }
    }
  }
}
