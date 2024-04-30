import { EditCustomerProfileComponent } from './edit-customer-profile.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerProfileService {

  private apiUrl: string = environment.apiUrl + '/edit-customer-profile';

  constructor(private http:HttpClient) { }

  EditCustomerProfile(userId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, data);
  }
}
