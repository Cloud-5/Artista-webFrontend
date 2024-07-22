import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviorenment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class notificationService{
  private apiUrl: string = environment.apiUrl + '/notifications';

  constructor(private http:  HttpClient) { }

  getNotifications(userId:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
  createNotification(notification:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create-notification`,{notification})
  }

  deleteAllNotifications(userId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/delete-all/${userId}`);
  }
}
