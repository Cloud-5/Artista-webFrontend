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

  getFollowingArtistsList(userId:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  unfollow(artistId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/unfollow`, { userId });
  }

}
