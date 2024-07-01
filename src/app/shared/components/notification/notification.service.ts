import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class NotificationService {

  constructor(private http: HttpClient) {
  // getNotificationsByUserId(userId:number):Observable<any[]>{
  //   return this.http.get<any[]>(`${apiUrl}?user_id=${userId}`);
  // }

   }
}
