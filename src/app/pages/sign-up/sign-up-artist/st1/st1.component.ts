
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-st1',
  templateUrl: './st1.component.html',
  styleUrls: ['./st1.component.css']
})
export class St1Component {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  continueToStep2() {
    // Perform any necessary validation or processing here

    // Redirect to Step 2 component
    this.router.navigate(['/st2']);
  }
}
