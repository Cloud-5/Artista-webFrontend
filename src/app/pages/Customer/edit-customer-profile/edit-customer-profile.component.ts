import { Component, OnInit } from '@angular/core';
import { EditCustomerProfileService } from './edit-customer-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../../../shared/services/customerData.service';
import { ImageUploadService } from '../../../shared/services/image-upload.service';

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css'],
})
export class EditCustomerProfileComponent implements OnInit {

  initialCustomerData: any = {}; // To store the initial customer data
emailInput: any;
confirmPasswordInput: any;

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
  bannerImageObj: File | undefined;

  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editingCustomer = params['userId'];

      this.customerDataService.currentCustomerData$.subscribe((data) => {
        this.customer = { ...data };
        this.initialCustomerData = { ...data }; // Save initial customer data
        console.log('customer', this.customer);
      });
    });
  }

  editDetails(editCustomerProfileForm: any) {
    if (editCustomerProfileForm.valid) {
      if (this.customer.newPassword && this.confirmPassword !== this.customer.newPassword) {
        alert('Passwords do not match');
        return;
      }

      const customerDetails = {
        banner_img_url: this.customer.banner_img_url,
        profile_photo_url: this.customer.profile_photo_url,
        firstName: this.customer.fName,
        lastName: this.customer.LName,
        description: this.customer.description,
        location: this.customer.location,
        phone: this.customer.phone,
      };
      console.log('customerDetailsSSSSSSSSSSSSSSSSSSSS', customerDetails);

      this.editCustomerProfileService.EditCustomerProfile(this.editingCustomer, customerDetails).subscribe(
          () => {
            alert('Profile saved successfully!');
          },
          (error) => {
            console.log('error editing customer', error);
            alert('There was an error saving the profile. Please try again.');
          }
        );
    }
  }

  discardChanges() {
    this.customer = { ...this.initialCustomerData };
    alert('Changes discarded and defaults set.');
    this.router.navigate(['/customer-profile-gallery']);
  }
  onBannerFileSelected(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.bannerImageObj = FILE;
  }

  onFileSelected(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.imageObj = FILE;
  }
  newImageUpload(folder: string, uploadType: string) {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj as Blob);
    this.ImageUploadService.imageUpload(imageForm, folder, uploadType).subscribe((res: any) => {
      this.customer.profile_photo_url = res.image.location;
      console.log('Image uploaded successfully:', this.customer.profile_photo_url);

    }, (error) => {
      console.log('error uploading image', error);
    });
  }

  uploadBannerImage(folder: string, uploadType: string) {
    const imageForm = new FormData();
    imageForm.append('image', this.bannerImageObj as Blob);
    this.ImageUploadService.imageUpload(imageForm, folder, uploadType).subscribe((res: any) => {
      this.customer.banner_img_url = res.image.location;
      console.log('Image uploaded successfully:', this.customer.banner_img_url);
    }, (error) => {
      console.log('error uploading banner image', error);
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

  removeBannerImage() {
    if (this.customer.banner_img_url) {
      const key = this.customer.banner_img_url.split('/').pop();
      this.ImageUploadService.removeImage(key as any).subscribe(
        () => {
          this.customer.banner_img_url = '';
        },
        (error) => {
          console.log('error removing banner image', error);
        }
      );
    }
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.editCustomerProfileService.changePassword(this.email, this.oldPassword, this.newPassword, this.confirmPassword).subscribe(
      (response) => {
        console.log('Password changed successfully', response);
        alert('Password changed successfully!');
        // Optionally reset form fields or navigate to another page
      },
      (error) => {
        console.error('Error changing password', error);
        alert('Error changing password. Please try again.');
      }
    );
  }
}

