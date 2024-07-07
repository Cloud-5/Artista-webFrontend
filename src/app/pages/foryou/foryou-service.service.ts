import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForyouServiceService {

  private apiUrl: string = environment.apiUrl + '/for-you';

  constructor(private http: HttpClient) { }

  fetchAll(userId: string , page: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }
}
