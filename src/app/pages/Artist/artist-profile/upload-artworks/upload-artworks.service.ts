import { OnInit } from '@angular/core';
// upload-artworks.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadArtworksService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addArtworkByArtist(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/artwork/upload`, formData);
  }




  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/artist-upload-artworks/`);
  }

 
}
