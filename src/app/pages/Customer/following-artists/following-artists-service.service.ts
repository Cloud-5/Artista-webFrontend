import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingArtistsServiceService {

  private apiUrl = environment.apiUrl + '/following-artists-list';

  constructor(private http: HttpClient) { }

  getFollowingArtistsList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${3}`);
  }

  unfollow(artistId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/unfollow`, { userId });
  }

}
