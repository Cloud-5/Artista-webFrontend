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
  getArtist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
}
