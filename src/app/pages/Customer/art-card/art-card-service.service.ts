import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtCardServiceService {
  private apiUrl = environment.apiUrl + '/art-card';

  constructor(private http: HttpClient) {}

  removeGalleryItem(customerUserId: string, artworkId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-gallery-item/${customerUserId}/${artworkId}`);
  }
}
