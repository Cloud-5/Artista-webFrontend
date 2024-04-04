  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
  import { ReactiveFormsModule } from '@angular/forms';
  import { CheckoutServiceService } from './checkout-service.service';
  import { CartServiceService } from '../cart/services/cart-service.service'; // Import the CartServiceService


  @Component({
    selector: 'app-checkout-form',
    templateUrl: './checkout-form.component.html',
    styleUrls: ['./checkout-form.component.css']
  })
  export class CheckoutFormComponent implements OnInit {

    reactiveForm: FormGroup;
    submitted: boolean = false;
    quantity: number = 0;
    price: number = 0;
    userData: any = {}; // Object to store user data
    cartItems: any[] = []; // Array to store cart items
    userId: number = 2;


    fiName: string = '';
    lastName: string = '';
    email: string = '';


    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private checkoutService: CheckoutServiceService, private cartService: CartServiceService) {
      this.reactiveForm = this.formBuilder.group({

        firstNameInput: new FormControl(null, [Validators.required]),
        lastNameInput: new FormControl(null, [Validators.required]),
        emailInput: new FormControl(null, [Validators.required, Validators.email]),
        locationInput: new FormControl(null, [Validators.required]),
        phoneNumberInput: new FormControl(null, [Validators.required, this.validatePhoneNumber]),
        descriptionInput: new FormControl(null, [Validators.maxLength(200)]),
        paymentOption: new FormControl(null, [Validators.required]),
        agreeTermsCheckbox: new FormControl(false),
        agreePrivacyCheckbox: new FormControl(false),
        agreeMarketingCheckbox: new FormControl(false)
      }, { validators: [this.paymentOptionValidator, this.checkAllCheckboxesChecked()] });
    }

    get f() { return this.reactiveForm.controls }

    async onSubmit() {
      console.log('Form submitted');
      this.submitted = true;
    
      // Check if form is valid before proceeding
       if ( this.reactiveForm.value.locationInput.invalid || this.reactiveForm.value.phoneNumberInput.invalid || this.reactiveForm.value.paymentOption.invalid || this.reactiveForm.value.descriptionInput.invalid || this.reactiveForm.value.paymentOption.invalid || this.reactiveForm.value.agreeTermsCheckbox.invalid || this.reactiveForm.value.agreePrivacyCheckbox.invalid || this.reactiveForm.value.agreeMarketingCheckbox.invalid) { 
        console.log('Form is invalid');
       
       return;
       
       }
    
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
    
      // Get form data
      const formData = {
        fName: this.reactiveForm.value.firstNameInput,
        lName: this.reactiveForm.value.lastNameInput,
        email: this.reactiveForm.value.emailInput,
        location: this.reactiveForm.value.locationInput,
        pNumber: this.reactiveForm.value.phoneNumberInput,
        description: this.reactiveForm.value.descriptionInput,
        paymentMethod: this.reactiveForm.value.paymentOption,
        cartItems: cartItemsData
      };
    
      console.log('Form data:', formData);
      console.log('Cart items data:', cartItemsData);
    
      // Send data to backend
      this.checkoutService.createPurchase(this.userId, formData).subscribe(
        response => {
          console.log('Purchase created successfully:', response);
          // reset the form or show a success message
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

      this.cartService.cartItems$.subscribe(cartItems => {
        this.cartItems = cartItems;
        console.log('Cart items: ', this.cartItems);
      });
      this.getCustomerData(this.userId);
    }

    getCustomerData(userId: number): void {
      this.checkoutService.getUserDetails(userId).subscribe((data: any) => {
        console.log('User data: ', data);
        this.fiName = data.fName;
        this.email = data.email;
        this.lastName = data.LName;
        console.log(this.fiName);
      });
    }







    validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
      const phoneNumberPattern = /^\+\d{11}$/;
      if (!phoneNumberPattern.test(control.value)) {
        return { 'invalidPhoneNumber': true };
      }
      return null;
    }

    paymentOptionValidator(group: FormGroup): { [key: string]: any } | null {
      const paymentOption = group.get('paymentOption')?.value;
      if (!paymentOption) {
        return { 'required': true };
      }
      return null;
    }

    checkAllCheckboxesChecked(): ValidatorFn {
      return (group: AbstractControl): { [key: string]: any } | null => {
        const agreeTerms = group.get('agreeTermsCheckbox')?.value;
        const agreePrivacy = group.get('agreePrivacyCheckbox')?.value;
        const agreeMarketing = group.get('agreeMarketingCheckbox')?.value;

        if (!agreeTerms || !agreePrivacy || !agreeMarketing) {
          return { 'checkboxesNotChecked': true };
        }
        return null;
      };
    }

  }
