import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviorenment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForyouServiceService {
  
  private apiUrl: string = environment.apiUrl + '/for-you';

  
  constructor(private http:HttpClient) { }

  fetchAll(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
