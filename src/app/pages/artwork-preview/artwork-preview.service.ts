import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtworkPreviewService {

  private apiUrl: string = environment.apiUrl + '/artwork-preview';

  constructor(private http: HttpClient) { }

  getArtworkDetails(artworkId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${artworkId}`);
  }

  
}