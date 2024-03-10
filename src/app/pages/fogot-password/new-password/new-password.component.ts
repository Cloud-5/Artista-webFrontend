// import { Component, OnInit } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// @Component({
//   selector: 'app-new-password',
//   templateUrl: './new-password.component.html',
//   styleUrl: './new-password.component.css'
// })
// export class NewPasswordComponent implements OnInit {
//   LoginForm: any;
//   constructor(private fb: FormBuilder)
//   {
//     this.LoginForm = this.fb.group({
//       Email:[""],
//       Password:[""]
//     })
//   }
//   ngOnInit(): void {
//
//   }
//
//   signForm()
//   {
//     console.log("loginform",this.LoginForm)
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup; // Adding ! operator to indicate that this will be initialized in ngOnInit

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.newPasswordForm && this.newPasswordForm.valid) {
      // Submit logic here
      console.log('Form submitted');
    }
  }
}
