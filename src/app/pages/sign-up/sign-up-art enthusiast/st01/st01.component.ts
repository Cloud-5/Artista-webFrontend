
import { Component } from '@angular/core';

@Component({
  selector: 'app-st01',
  templateUrl: './st01.component.html',
  styleUrls: ['./st01.component.css']
})
export class St01Component {
  formData = {
    email: '',
    password: ''
  };

  submitForm() {
    // Handle form submission logic here
    console.log('Form submitted with data:', this.formData);
  }
}
