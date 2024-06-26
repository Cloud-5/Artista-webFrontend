

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { UserService } from './service/user.service';

// @Component({
//   selector: 'app-new-password',
//   templateUrl: './new-password.component.html',
//   styleUrls: ['./new-password.component.css']
// })
// export class NewPasswordComponent implements OnInit {
//   newPasswordForm!: FormGroup; // Adding ! operator to indicate that this will be initialized in ngOnInit
//   formData = {
   
//     password: '',
//     confirmPassword: ''
//   };
//   constructor(private formBuilder: FormBuilder, private userService: UserService) { }

//   ngOnInit(): void {
//     this.newPasswordForm = this.formBuilder.group({
      
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', Validators.required]
//     }, {
//       validator: this.passwordsMatchValidator
//     });
//   }

//   passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
//     if (!password || !confirmPassword) {
//       return null;
//     }
//     return password.value === confirmPassword.value ? null : { 'passwordsMismatch': true };
//   }

//   submitForm(): void {
//     if (this.newPasswordForm && this.newPasswordForm.valid) {
//       const { email, password, confirmPassword } = this.newPasswordForm.value;
//       this.userService.resetPassword(email, password, confirmPassword).subscribe(
//         (response) => {
//           console.log('Password reset successfully');
//           // Handle success response
//         },
//         (error) => {
//           console.error('Error resetting password:', error);
//           // Handle error response
//         }
//       );
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { UserService } from './service/user.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-new-password',
//   templateUrl: './new-password.component.html',
//   styleUrls: ['./new-password.component.css']
// })
// export class NewPasswordComponent implements OnInit {
//   newPasswordForm!: FormGroup;
  

//   constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

//   ngOnInit(): void {
//     this.newPasswordForm = this.formBuilder.group({
//       password: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         this.passwordStrengthValidator()
//       ]],
//       confirmPassword: ['', Validators.required]
//     }, {
//       validator: this.passwordsMatchValidator
//     });
//   }

//   passwordStrengthValidator() {
//     return (control: AbstractControl) => {
//       const value = control.value;
//       if (!value) {
//         return null;
//       }
//       const hasUpperCase = /[A-Z]/.test(value);
//       const hasLowerCase = /[a-z]/.test(value);
//       const hasDigit = /\d/.test(value);
//       const hasSpecial = /[!@#$%^&*]/.test(value);
//       const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
//       if (!valid) {
//         return { 
//           uppercase: !hasUpperCase,
//           lowercase: !hasLowerCase,
//           digit: !hasDigit,
//           special: !hasSpecial
//         };
//       }
//       return null;
//     };
//   }

//   passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
//     if (!password || !confirmPassword) {
//       return null;
//     }
//     return password.value === confirmPassword.value ? null : { 'passwordsMismatch': true };
//   }

// //   
//   submitForm(): void {
//     if (this.newPasswordForm && this.newPasswordForm.valid) {
//       const user_id = localStorage.getItem('user_id') ? Number(localStorage.getItem('user_id')) : 0; // Get user ID from local storage
//       if (user_id) {
//         const { password, confirmPassword } = this.newPasswordForm.value;
//         this.userService.resetPassword(user_id.toString(), password, confirmPassword).subscribe(
//           (response) => {
//             console.log('Password reset successfully');
//             this.router.navigate(['/login']);
//           },
//           (error) => {
//             console.error('Error resetting password:', error);
//           }
//         );
//       } else {
//         console.error('User ID not found in local storage');
//       }
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        localStorage.setItem('email', email);
      }
    });

    this.newPasswordForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordsMatchValidator
    });
  }

  passwordStrengthValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*]/.test(value);
      const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
      if (!valid) {
        return { 
          uppercase: !hasUpperCase,
          lowercase: !hasLowerCase,
          digit: !hasDigit,
          special: !hasSpecial
        };
      }
      return null;
    };
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { 'passwordsMismatch': true };
  }

  submitForm(): void {
    if (this.newPasswordForm && this.newPasswordForm.valid) {
      const email = localStorage.getItem('email');
      if (email) {
        const { password, confirmPassword } = this.newPasswordForm.value;
        this.userService.resetPassword(email, password, confirmPassword).subscribe(
          response => {
            console.log('Password reset successfully');
            localStorage.removeItem('email');
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error resetting password:', error);
          }
        );
      } else {
        console.error('Email not found in local storage');
      }
    }
  }
}
