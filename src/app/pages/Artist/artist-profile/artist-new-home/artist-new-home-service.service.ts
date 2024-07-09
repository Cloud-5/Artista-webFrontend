import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistNewHomeServiceService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getArtistDetail(artistId: string): Observable<any> {
    console.log('artistId', artistId);
    return this.http.get(`${this.apiUrl}/artist-new-home/${artistId}`);
  }


  getArtworksForArtist(artistId: string) {
    return this.http.get(`${this.apiUrl}/artwork/all/${artistId}`);
  }

  getLikeCountForArtwork(artId: number) {
    return this.http.get(`${this.apiUrl}/artwork/likes/${artId}`)
  }

  deleteArtwork(artId: number) {
    return this.http.delete(`${this.apiUrl}/artwork/${artId}`);
  }

  updateArtwork(artId: number, artwork: any) {
    return this.http.put(`${this.apiUrl}/artwork/${artId}`, artwork);
  }
  getArtworksCount(artistId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/artworks/count/${artistId}`);
  }

  getArtworksCountForArtist(artistId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/artist/${artistId}/creation/count`);
  }
}

