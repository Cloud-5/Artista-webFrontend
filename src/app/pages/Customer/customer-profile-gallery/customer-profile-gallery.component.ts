import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from './customer-service.service';


@Component({
  selector: 'app-customer-profile-gallery',
  templateUrl: './customer-profile-gallery.component.html',
  styleUrl: './customer-profile-gallery.component.css',
})
export class CustomerProfileGalleryComponent implements OnInit{

  CustomerData: any = {};

  galleryArtData: any[] = [];

  constructor(
    public customerService: CustomerServiceService
  ) { }

  ngOnInit(): void {
    const userId = 3;
    this.getCustomerDetails(userId);
    this.getCustomerGalleryArts(userId);
  }

  getCustomerDetails(userId: number): void {
    this.customerService.getCustomerDetails(userId).subscribe(
      (data: any[]) => {
        console.log(data[0])
        this.CustomerData = data[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCustomerGalleryArts(userId: number): void {
    this.customerService.getCustomerGalleryArts(userId).subscribe(
      (data: any[]) => {
        console.log(data)
        this.galleryArtData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }



}
