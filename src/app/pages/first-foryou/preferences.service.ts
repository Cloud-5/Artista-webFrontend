import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviorenment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private apiUrl: string = environment.apiUrl + '/preferences';
  constructor(private http:  HttpClient) {  }

  showPreferences(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  
}
