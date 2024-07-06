import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviorenment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalizeService {
  private apiUrl: string = environment.apiUrl + '/personalize';

  constructor(private http:  HttpClient) { }

    getCategories(userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${userId}`);
    }

    updateCategories(user_id: string, new_category_ids: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${user_id}`, {new_category_ids});
    }
  }

  