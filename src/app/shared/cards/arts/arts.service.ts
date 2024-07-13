import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviorenment';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private apiUrl: string = environment.apiUrl + '/cart2';

  constructor(private http: HttpClient) { }

  addItem(userId: string, artworkId: number): Observable<any> {
    console.log('userId', userId, 'artworkId', artworkId);
    return this.http.post(`${this.apiUrl}/add`, { userId, artworkId });
  }

  removeItem(userId: string, artworkId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/remove`, { body: { userId, artworkId } });
  }
  

  getCartItems(userId:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  incrementQuantity(userId: string, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/increment`, { userId, artworkId });
  }

  decrementQuantity(userId: string, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/decrement`, { userId, artworkId });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/clear`, { body: { userId } });
  }
  likeArtwork(userId: string, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/like`, { userId,artworkId });
  }
  getLikedStatus(userId: string, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/liked-status`, { userId, artworkId });
  }

  getTotalLikes(artworkId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-likes/${artworkId}`);
  }

}  