import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchArtService {

  private apiUrl = environment.apiUrl + '/search-art';

  constructor(private http: HttpClient) { }

  searchArtworks(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/${searchTerm}`);
  }

  fetchCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }
}
