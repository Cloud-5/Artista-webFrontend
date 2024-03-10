import { Component } from '@angular/core';

@Component({
  selector: 'app-st02',
  templateUrl: './st02.component.html',
  styleUrls: ['./st02.component.css']
})
export class St02Component {
  firstName: string = '';
  lastName: string = '';
  dob: Date | null = null;
  location: string = '';

  createAccount() {
    // Implement logic to handle form submission here
    console.log('Form submitted');
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Date of Birth:', this.dob);
    console.log('Location:', this.location);
  }
}
