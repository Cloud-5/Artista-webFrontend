import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Console } from 'console';
@Component({
  selector: 'app-st02',
  templateUrl: './st02.component.html',
  styleUrls: ['./st02.component.css']
})

export class St02Component implements OnInit {
  fName: string = '';
  lName: string = '';
  dob: string = '' ;
  location: string = '';
  email = '';
  password = '';
  role = '';
  
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      dob: ['', Validators.required],
      location: ['', Validators.required],
      role: ['', Validators.required],
      
    });

    const data = sessionStorage.getItem('artista-form-data');

    if (data) {
      const user = JSON.parse(data);
      this.email = user.email;
      this.password = user.password;
    }

    if (!data) this.router.navigate(['/st01']);
    
  }
  createAccount() {
    // Implement logic to handle form submission here
    console.log('Form submitted');
    console.log('First Name:', this.fName);
    console.log('Last Name:', this.lName);
    console.log('Date of Birth:', this.dob);
    console.log('Location:', this.location);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Role:', this.role);


     // Send HTTP request to backend to create user account
     let userData = this.signupForm.value;
     userData = {...userData, email: this.email, password: this.password};
    //  console.log('Secondform submit',userData)
     this.userService.signup(userData).subscribe(
       (response) => {
         console.log('User created successfully:', response);
         // Redirect to next step after successful signup
         this.router.navigate(['/']); 
       },
       (error) => {
        
         console.error('Error creating user:', error);
         // Handle error response
       }
     );
  }
}
