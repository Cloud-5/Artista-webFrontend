import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment"
import { Observable } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistCreationsService {
  private apiUrl: string = environment.apiUrl;



  constructor(private http: HttpClient) { }

getArtworksForArtist(artistId:number){
  return this.http.get(`${this.apiUrl}/artwork/all/${artistId}`);
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
