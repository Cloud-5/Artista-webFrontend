// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from "../../../../../environments/environment"

// @Injectable({
//   providedIn:'root'
// })
// export class ArtistFollowersService{
//   private apiUrl:string=environment.apiUrl;
//   constructor(private http:HttpClient){}


//   getFollowersForArtist(artistId:number){
//     return this.http.get('${this.apiUrl}/artist/${artistId}/followers');
//   }

//   deleteFollower(followerId:number,artistId:number){
//     return this.http.delete('${this.apiUrl}/user-management/delete-follower/${artistId}/${followerId}');
//   }


// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistFollowersService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

    getFollowersForArtist(artistId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artist-followers/${artistId}/followers`);
  }

//   deleteFollower(followerId: number, artistId: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/artist-followers/${artistId}/followers/${followerId}`)
//     .pipe(
//       // catchError(this.handleError)
//     );
//   }
//   private handleError(error:HttpErrorResponse){
//     console.error('an error occoured',error.message);
//   return throwError('Something went wrong; please try again later.');
// }

    deleteFollowers(followerId: number, artistId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/artist-followers/${artistId}/followers/${followerId}`);
    }

}
