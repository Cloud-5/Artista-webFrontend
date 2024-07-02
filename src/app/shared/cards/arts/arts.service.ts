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

  addItem(userId: number, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { userId, artworkId });
  }

  removeItem(userId: number, artworkId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/remove`, { body: { userId, artworkId } });
  }
  

  getCartItems(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  incrementQuantity(userId: number, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/increment`, { userId, artworkId });
  }

  decrementQuantity(userId: number, artworkId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/decrement`, { userId, artworkId });
  }

  clearCart(userId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/clear`, { body: { userId } });
  }
}  