import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchArtService {

  private apiUrl = environment.apiUrl + '/search-art'; // Adjusted endpoint URL

  constructor(private http: HttpClient) { }

  getAllArtworks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
