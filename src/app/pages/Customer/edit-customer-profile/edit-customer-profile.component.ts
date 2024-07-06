
import { Component, OnInit } from '@angular/core';
import { EditCustomerProfileService } from './edit-customer-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../../../shared/services/customerData.service';
import { ImageUploadService } from '../../../shared/services/image-upload.service';

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
    private customerDataService: CustomerDataService,
    private ImageUploadService: ImageUploadService
  ) {}

  editingCustomer: string = '';
  customer: any = {};
  imageObj: File | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editingCustomer = params['userId'];

      this.customerDataService.currentCustomerData$.subscribe((data) => {
        this.customer = data;
        console.log('customer', this.customer);
      });
    });
  }

  editDetails(editCustomerProfileForm: any) {
    if (editCustomerProfileForm.valid) {
      if (this.customer.newPassword && this.confirmPassword !== this.customer.newPassword) {

        return;
      }

      const customerDetails = {
        profile_photo_url: this.customer.profile_photo_url,
        firstName: this.customer.fName,
        lastName: this.customer.LName,
        description: this.customer.description,
        email: this.customer.email,
        newPassword: this.customer.newPassword,
        location: this.customer.location,
      };
      console.log('customerDetails', customerDetails);


      this.editCustomerProfileService
        .EditCustomerProfile(this.editingCustomer, customerDetails)
        .subscribe(
          () => {
          },
          (error) => {
            console.log('error editing customer', error);
          }
        );
    }
  }

  onFileSelected(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.imageObj = FILE;
  }

  newImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj as Blob);
    this.ImageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.customer.profile_photo_url = res.image.location;
    });
  }

  removeExistingImage() {
    if (this.customer.profile_photo_url) {
      const key = this.customer.profile_photo_url.split('/').pop();
      this.ImageUploadService.removeImage(key as any).subscribe(
        () => {
          this.customer.profile_photo_url = '';
        },
        (error) => {
          console.log('error removing image', error);
        }
      );
    }
  }
}
