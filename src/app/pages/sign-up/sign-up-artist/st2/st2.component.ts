
import { Component } from '@angular/core';

@Component({
  selector: 'app-st2',
  templateUrl: './st2.component.html',
  styleUrls: ['./st2.component.css']
})
export class St2Component {
  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  location: string = '';

  createAccount() {
    // Perform any necessary validation or processing here
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Date of Birth:', this.dob);
    console.log('Location:', this.location);
  }
}
