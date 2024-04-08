import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackListService {

  private apiUrl = environment.apiUrl + '/feedback-list';

  constructor(private http: HttpClient) { }

  getFeedbackList(artistUserId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${artistUserId}`);
  }
}
