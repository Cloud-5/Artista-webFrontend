import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment"
import { Observable } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreationsService {
  artistId: string = localStorage.getItem('user_id') || '';

  constructor(private http: HttpClient) { }
  private apiUrl: string = environment.apiUrl;

  getArtworksForArtist(artistId:string){
    return this.http.get(`${this.apiUrl}/artwork/all/${this.artistId}`);
  }
   getLikeCountForArtwork(artId:number){
    return this.http.get(`${this.apiUrl}/artwork/likes/${artId}`);
   }
   deleteArtwork(artId:number){
    return this.http.delete(`${this.apiUrl}/artwork/${artId}`);
   }
  updateArtwork(artId:number,artwork:any){
    return this.http.put(`${this.apiUrl}/artwork/${artId}`,artwork);
  }

}
