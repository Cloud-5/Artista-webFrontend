
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup; // Adding ! operator to indicate that this will be initialized in ngOnInit

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.newPasswordForm && this.newPasswordForm.valid) {
      const { email, password, confirmPassword } = this.newPasswordForm.value;
      this.userService.resetPassword(email, password, confirmPassword).subscribe(
        (response) => {
          console.log('Password reset successfully');
          // Handle success response
        },
        (error) => {
          console.error('Error resetting password:', error);
          // Handle error response
        }
      );
    }
  }
}
