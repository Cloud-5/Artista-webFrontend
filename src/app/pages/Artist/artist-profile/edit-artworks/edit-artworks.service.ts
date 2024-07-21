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

  // addArtworkByArtist(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/artwork/upload`, formData);
  // }

  // upload2DArtwork(art2D:any): Observable<any>{
  //   console.log('art2d in service',art2D);
  //   return this.http.post(`${this.apiUrl}/artist-upload-artworks/2d`, art2D);
  // }

  // upload3DArtwork(art3D:any): Observable<any>{
  //   console.log('art3d in service',art3D);
  //   return this.http.post(`${this.apiUrl}/artist-upload-artworks/3d`, art3D);
  // }

  // getCategories(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/artist-upload-artworks/`);  }


  // //from buddi part
  // getArtworkDetails(artworkId: string, userId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${artworkId}?userId=${userId}`);
  // }

  getArtworkDetails(artwork_id:number):Observable<any>{
    console.log('artworkId in service',artwork_id);
    return this.http.get<any>(`${this.apiUrl}/edit-artwork/${artwork_id}`);
  }
  update2d(artwork_id:number, artwork2d:any):Observable<any>{
    console.log('artworkId in service 2d',artwork_id);
    return this.http.put<any>(`${this.apiUrl}/edit-artwork/2d/${artwork_id}`,artwork2d);
  }
  update3d(artwork_id:number, artwork3d:any):Observable<any>{
    console.log('artworkId in service 3d',artwork_id);
    return this.http.put<any>(`${this.apiUrl}/edit-artwork/3d/${artwork_id}`,artwork3d);
  }

}
