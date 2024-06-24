// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl: string = environment.apiUrl + '/preferences';
  private apiUrl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) {}

 login(email: string, password: string):Observable<any>{
  return this.http.post(`${this.apiUrl}/login`,{ email, password });
 }

//  hasPreferences(userId: string) {
//   return this.http.get<boolean>(`/hasPreferences/${userId}`);
// }

// hasPreferences(userId: string): Observable<boolean> {
//   return this.http.get<{ hasPreferences: boolean }>(`/hasPreferences/${userId}`)
//     .pipe(
//       map((response: { hasPreferences: any; }) => response.hasPreferences)
//     );
// }

checkPreferences(uid: string): Observable<any> {
  console.log('uid', uid);
  return this.http.get(`${this.apiurl}/checkPreferences/${uid}`);
}
}


