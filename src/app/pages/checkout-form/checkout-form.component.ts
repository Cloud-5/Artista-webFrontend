import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { CheckoutServiceService } from './checkout-service.service';
import { CartItemService } from '../../shared/cards/arts/arts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import intlTelInput from 'intl-tel-input';

import { group } from 'node:console';
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {


  title='intlInputNew';
  reactiveForm: FormGroup;
  submitted: boolean = false;
  submissionSuccess = false;
  quantity: number = 0;
  price: number = 0;
  userData: any = {}; // Object to store user data
  cartItems: any[] = []; // Array to store cart items
  userId: string = localStorage.getItem('user_id') || '';

  fiName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';

  private iti: any;
  @ViewChild('phoneNumberInput', { static: false }) phoneNumberInput: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
     private formBuilder: FormBuilder,
      private checkoutService: CheckoutServiceService, 
       private cartItemService: CartItemService,
       private reactiveFormsModule: ReactiveFormsModule, 
       private commonModule: CommonModule)
       
       {
      this.reactiveForm = this.formBuilder.group({
        firstNameInput: [null, Validators.required],
        lastNameInput: [null, Validators.required],
        emailInput: [null, [Validators.required, Validators.email]],
        locationInput: [null, Validators.required],
        phoneNumberInput: [null, [Validators.required, this.validatePhoneNumber.bind(this)]],
        
        paymentOption: [null, Validators.required],
        agreeTermsCheckbox: [false, Validators.requiredTrue],
        agreePrivacyCheckbox: [false, Validators.requiredTrue],
        agreeMarketingCheckbox: [false]
      });
    }

  get f() { return this.reactiveForm.controls }

  async onSubmit() {
    console.log('Form submitted');
    this.submitted = true;
  
     //Check if form is valid before proceeding
     if (this.reactiveForm.invalid) { 
       return;
     }

     // Simulate a successful submission
    this.submissionSuccess = true;
    
    this.submitted = false;

    // Display success message for 5.5 seconds
    setTimeout(() => {
      this.submissionSuccess = false;
      this.reactiveForm.reset();
    }, 5500);
  
    // Extract artwork IDs and quantities from cartItems
    const cartItemsData = this.cartItems.map(item => ({
      artwork_id: item.artwork_id,
      quantity: item.quantity
    }));
  
    // Check if there are valid cart items to proceed
    if (cartItemsData.length === 0) {
      console.error('Error: Invalid cart items');
      // Handle invalid cart items (e.g., show error message to the user)
      return;
    }

    const phoneNumber = this.iti ? this.iti.getNumber() : '';
  
    // Get form data
    const formData = {
      fName: this.reactiveForm.value.firstNameInput,
      lName: this.reactiveForm.value.lastNameInput,
      email: this.reactiveForm.value.emailInput,
      location: this.reactiveForm.value.locationInput,
      phoneNumber: phoneNumber, 
     
      paymentMethod: this.reactiveForm.value.paymentOption,
      cartItems: cartItemsData
    };
  
    console.log('Form data:', formData);
    console.log('Cart items data:', cartItemsData);
  
    // Send data to backend
    this.checkoutService.createPurchase(this.userId, formData).subscribe(
      response => {
        console.log('Purchase created successfully:', response);
        // Optionally, reset the form or show a success message
      },
      error => {
        console.error('Error creating purchase:', error);
        // Handle error (e.g., show error message to the user)
      }
    );
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quantity = +params['quantity'] || 0;
      this.price = +params['subtotal'] || 0;
      console.log(this.cartItems);
    });

    this.cartItemService.getCartItems(this.userId).subscribe(cartItems => {
      this.cartItems = cartItems;
      console.log('Cart items: ', this.cartItems);
    });
    this.getCustomerData(this.userId);
    const inputElement =document.getElementById('phoneNumberInput');
    if(inputElement){
      this.iti = intlTelInput(inputElement, {
        initialCountry: 'US',
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      });
    }
  }

  getCustomerData(userId: string): void {
    this.checkoutService.getUserDetails(userId).subscribe((data: any) => {
      console.log('User data: ', data);
      this.fiName = data.fName;
      this.email = data.email;
      this.lastName = data.LName;
      this.location = data.location;
      console.log(this.fiName);
    });
  }


  // validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
  //   const phoneNumberPattern = /^\+\d{11}$/;
  //   if (!phoneNumberPattern.test(control.value)) {
  //     return { 'phoneInvalid': true };
  //   }
  //   return null;
  // }
  validatePhoneNumber(control: AbstractControl) {
    if (this.iti && !this.iti.isValidNumber()) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  showMessage(event: Event) {
    event.preventDefault();
    alert('You cannot change this field');
  }
}



