
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-st01',
  templateUrl: './st01.component.html',
  styleUrls: ['./st01.component.css']
})
export class St01Component {
  formData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) { }

  submitForm() {
    // Handle form submission logic here
    sessionStorage.setItem('artista-form-data', JSON.stringify(this.formData));
    console.log('Form submitted with data:', this.formData);
    this.router.navigate(["/st02"]);
  }
}
 