

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistFollowersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  artistId: string = localStorage.getItem('user_id') || '';

    getFollowersForArtist(artistId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artist-followers/${artistId}/followers`);
  }


    deleteFollowers(followerId: string,artistId:string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/artist-followers/${artistId}/delete-followers/${followerId}`);
    }

}
