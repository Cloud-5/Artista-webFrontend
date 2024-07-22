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
  getArtworkIs3D(artwork_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/edit-artwork/is3d/${artwork_id}`);

  }

}
