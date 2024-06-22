// artist-followers.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistFollowersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getFollowersForArtists(artistId: number) {
    return this.http.get(`${this.apiUrl}/user-management/followers/${artistId}`);
  }

  deleteFollower(followerId: number, artistId: number) {
    return this.http.delete(`${this.apiUrl}/user-management/delete-follower/${followerId}/${artistId}`);
  }

  getFeedbackForArtist(artistId: number) {
    return this.http.get(`${this.apiUrl}/user-management/feedback/${artistId}`);
  }
}




