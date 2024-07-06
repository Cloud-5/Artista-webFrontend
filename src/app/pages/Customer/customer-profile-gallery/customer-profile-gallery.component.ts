import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from './customer-service.service';
import { CustomerDataService } from '../../../shared/services/customerData.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-profile-gallery',
  templateUrl: './customer-profile-gallery.component.html',
  styleUrl: './customer-profile-gallery.component.css',
})
export class CustomerProfileGalleryComponent implements OnInit {

  CustomerData: any = {};
  userId: string = '24';
  artsData: any[] = [];
  filteredArts: any[] = [];

  constructor(
    public customerService: CustomerServiceService,
    private customerDataService: CustomerDataService,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    const userId = 24;
    this.getCustomerDetails(userId);
    this.getCustomerGalleryArts(userId);
  }

  onItemRemoved(artwork_id:string){
    console.log('Item removed', artwork_id);
    this.getCustomerGalleryArts(Number(this.userId));
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
        this.artsData = data.map((artwork: any) => ({
          artwork_image_url: artwork.artwork_image_url,
          artwork_name: artwork.artwork_name,
          artwork_price: artwork.artwork_price,
          artist_name: artwork.artist_name,
          total_likes: artwork.total_likes,
          artwork_id: artwork.artwork_id
        }));
        this.filteredArts = this.artsData;
        console.log(this.filteredArts);
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

  deactivateCustomer(): void {
    const confirmed = confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    if (confirmed) {
      const userId = Number(this.userId);
      this.customerService.deactivateCustomer(userId).subscribe(
        (response: any) => {
          console.log(response.message);
          alert('Your profile has been deleted successfully.');
          this.router.navigate(['/']);  // Redirect to home or any other page
        },
        (error: any) => {
          console.log(error);
          alert('Error deactivating the profile.');
        }
      );
    }
  }

}

