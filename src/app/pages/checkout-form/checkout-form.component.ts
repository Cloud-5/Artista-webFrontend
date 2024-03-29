import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
 

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
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

  onSubmit() {
    console.log('Form submitted');
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }
    // Handle form submission logic here
  
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quantity = +params['quantity'] || 0;
      this.price = +params['subtotal'] || 0;
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
