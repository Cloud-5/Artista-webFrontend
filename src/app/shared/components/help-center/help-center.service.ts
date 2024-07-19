import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class HelpCenterService {
  private apiUrl:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  submitComplaint(complaint:any):Observable<any>{
    console.log('compain in service', complaint);
    return this.http.post(`${this.apiUrl}/help-center/complaints`,complaint);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/help-center/categories`);
  }



}
