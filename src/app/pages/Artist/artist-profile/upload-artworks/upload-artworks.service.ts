
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

  upload2DArtwork(art2D:any): Observable<any>{
    console.log('art2d in service',art2D);
    return this.http.post(`${this.apiUrl}/artist-upload-artworks/2d`, art2D);
  }

  upload3DArtwork(art3D:any): Observable<any>{
    console.log('art3d in service',art3D);
    return this.http.post(`${this.apiUrl}/artist-upload-artworks/3d`, art3D);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/artist-upload-artworks/`);
  }


}
