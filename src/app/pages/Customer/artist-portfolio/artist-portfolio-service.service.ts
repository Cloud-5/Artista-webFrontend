import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistPortfolioService {
  private apiUrl = `${environment.apiUrl}/artist-portfolio`;
  private apiUrlCreations = `${environment.apiUrl}/artist-portfolio-creations`;

  constructor(private http: HttpClient) {}

  getArtistDetails(artistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${artistId}`);
  }

  getArtistCreations(artistId: number): Observable<any> {
    return this.http.get(`${this.apiUrlCreations}/${artistId}`);
  }

  toggleFollow(artistId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/follow`, { userId });
  }

  unfollow(artistId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/unfollow`, { userId });
  }

  submitFeedback(artistId: number, feedback: string, customerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/feedback`, { feedback, customerId });
  }

  submitRating(artistId: number, ratingValue: number, customerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${artistId}/rating`, { ratingValue, customerId });
  }
}
