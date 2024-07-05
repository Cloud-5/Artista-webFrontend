import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistFeedbackService {
  private apiUrl = 'http://localhost:3000'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getFeedbackForArtist(artistId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artist-feedback/${artistId}`);
  }

  deleteFeedback(feedbackId: number, artistId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/artist-feedback/${feedbackId}`);
  }
}
