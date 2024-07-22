import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})


export class NotificationService {
  private apiUrl: string = environment.apiUrl;;

  constructor(private http: HttpClient) {
  // getNotificationsByUserId(userId:number):Observable<any[]>{
  //   return this.http.get<any[]>(`${apiUrl}?user_id=${userId}`);
  // }

   }

   createNotification(notification:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create-notification`,{notification})
  }
}
