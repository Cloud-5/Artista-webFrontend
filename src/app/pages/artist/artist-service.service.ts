import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviorenment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceService {

  private apiUrl: string = environment.apiUrl + '/artist-page';

  constructor(private http:  HttpClient) { }
  getArtists(params: any): Observable<any> {
    let url = `${this.apiUrl}?page=${params.page}&limit=${params.limit}`;
    if (params.searchKeyword) url += `&searchKeyword=${params.searchKeyword}`;
    if (params.profession) url += `&profession=${params.profession}`;
    if (params.location) url += `&location=${params.location}`;
    if (params.featured !== undefined) url += `&featured=${params.featured}`;
    if (params.sortBy) url += `&sortBy=${params.sortBy}`;
    return this.http.get(url);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locations`);
  }

  
}
