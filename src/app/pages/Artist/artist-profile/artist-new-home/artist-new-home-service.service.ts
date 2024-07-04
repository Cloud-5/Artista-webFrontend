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

  getArtistDetail(artistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-management/${artistId}`);
  }

  getArtworksForArtist(artistId: number) {
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
  getArtworksCount(artistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/artworks/count/${artistId}`);
  }

  getArtworksCountForArtist(artistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/artist/${artistId}/creation/count`);
  }
}

