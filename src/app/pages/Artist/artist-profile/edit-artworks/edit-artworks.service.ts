import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditArtworksService {
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
    return this.http.get<any[]>(`${this.apiUrl}/artist-upload-artworks/`);  }


  //from buddi part
  getArtworkDetails(artworkId: string, userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${artworkId}?userId=${userId}`);
  }

}
