import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private apiUrl = environment.apiUrl + '/customer-profile-gallery';
  private apiUrl1 = environment.apiUrl + '/customer-gallery-arts';

  constructor(private http: HttpClient) { }

  getCustomerDetails(UserId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${UserId}`);
  }

  getCustomerGalleryArts(UserId: number): Observable<any> {
    return this.http.get(`${this.apiUrl1}/${UserId}`);
  }

  deactivateCustomer(UserId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deactivate/${UserId}`, {});
  }

  removeGalleryItem(userId: number, artworkId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/${artworkId}`);
  }

}

