import { Component, OnInit } from '@angular/core';
import { EditCustomerProfileService } from './edit-customer-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../../../shared/services/customerData.service';

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrl: './edit-customer-profile.component.css',
})
export class EditCustomerProfileComponent implements OnInit {

  confirmPassword: any;

  constructor(
    private editCustomerProfileService: EditCustomerProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private customerDataService: CustomerDataService
  ) {}

  editingCustomer: string = '';
  customer: any = {};

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editingCustomer = params['userId'];
      this.customerDataService.currentCustomerData$.subscribe((data) => {
        this.customer = data;
        console.log('SELECTED CUSTOMER', this.customer);
      });
    });
  }

  editDetails(editCustomerProfileForm: any) {
    if (editCustomerProfileForm.valid) {
      if (this.customer.newPassword && this.confirmPassword !== this.customer.newPassword) {
        console.log('Passwords do not match');
        return; 
      }

      const customerDetails = {
        firstName: this.customer.fName,
        lastName: this.customer.LName,
        description: this.customer.description,
        email: this.customer.email,
        newPassword: this.customer.newPassword,
        location: this.customer.location,
      };

      console.log('customer new data', customerDetails);

      this.editCustomerProfileService
        .EditCustomerProfile(this.editingCustomer, customerDetails)
        .subscribe(
          () => {
            console.log('edited successfully');
          },
          (error) => {
            console.log('error editing customer', error);
          }
        );
    }
  }
}
