import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from './customer-service.service';
import { CustomerDataService } from '../../../shared/services/customerData.service';


@Component({
  selector: 'app-customer-profile-gallery',
  templateUrl: './customer-profile-gallery.component.html',
  styleUrl: './customer-profile-gallery.component.css',
})
export class CustomerProfileGalleryComponent implements OnInit{

  CustomerData: any = {};
  userId: string = '3';
  galleryArtData: any[] = [];

  artsData: any[] = [];
  filteredArts: any[] = [];

  constructor(
    public customerService: CustomerServiceService,
    private customerDataService: CustomerDataService
  ) { }

  ngOnInit(): void {
    const userId = 3;
    this.getCustomerDetails(userId);
    this.getCustomerGalleryArts(userId);
  }

  getCustomerDetails(userId: number): void {
    this.customerService.getCustomerDetails(userId).subscribe(
      (data: any[]) => {
        this.CustomerData = data[0];
        this.customerDataService.setCustomerData(data[0]);
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

  searchByKeyword(searchKeyword: string): void {
    searchKeyword = searchKeyword.toLowerCase().trim();
    console.log(searchKeyword);

    if (searchKeyword === '') {
      this.filteredArts = this.artsData;
    } else {
      this.filteredArts = this.artsData.filter((art) =>
        art.artwork_name.toLowerCase().includes(searchKeyword) ||
        art.artist_name.toLowerCase().includes(searchKeyword)
      );
    }
  }



}
