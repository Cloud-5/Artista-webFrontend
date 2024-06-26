import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditArtistProfileService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // getArtistDetail(artistId:number ):Observable<any>{
  //   return this.http.get(`${this.apiUrl}/user-management/artist-details/${artistId}`);
  // }

  // getArtworksForArtist(artistId:number){
  //   return this.http.get(`${this.apiUrl}/artwork/all/${artistId}`);
  // }




}



