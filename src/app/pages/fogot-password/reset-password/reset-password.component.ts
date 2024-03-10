
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup; // Defined resetForm property

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm(): void { // Defined submitForm method
    if (this.resetForm && this.resetForm.valid) {
      // Send password reset instructions or process the form data
      console.log(this.resetForm.value);
    }
  }


}
