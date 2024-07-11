import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditArtistProfileService {

  public userData: any = {};
  public artworks: any = [];


  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateArtistProfile(artistId: string, artistData: any): Observable<any> {
    console.log('userdata', artistData);
    return this.http.put(`${this.apiUrl}/artist-edit/${artistId}`, artistData);
  }




}
