import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment"
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '../../../../shared/interfaces/platform.interface';


@Injectable({
  providedIn: 'root'
})
export class EditArtistProfileService {
  artistId: string = localStorage.getItem('user_id') || '';

  public userData: any = {};
  public artworks: any = [];


  private apiUrl: string = environment.apiUrl;
private apiurl: String = environment.apiUrl +'/user'
  constructor(private http: HttpClient) { }

  updateArtistProfile(artistId: string, artistData: any): Observable<any> {

    return this.http.put(`${this.apiUrl}/artist-edit/${artistId}`, artistData);
  }

  getArtistDetail(artistId: string): Observable<any> {
    console.log('artistId', artistId);
    return this.http.get(`${this.apiUrl}/artist-new-home/${artistId}`);
  }
  getSocialAccounts(artistId: string): Observable<any> {
    console.log('artistId in service', artistId);
    return this.http.get(`${this.apiUrl}/artist-edit/social-accounts/${artistId}`);

  }

  getFollowers(artistId: string): Observable<any> {
    console.log('artistIdddddddddddddddddddddddd', artistId);
    return this.http.get(`${this.apiUrl}artist-edit/${artistId}`);
  }

  getSocialMediaPlatforms():Observable<any>{
return this.http.get(`${this.apiUrl}/artist-edit/social-media-platforms`)
  }


  updateSocialMediaLink(artistId: string, platformId: number, accountUrl: string): Observable<any> {
    const body = {
      platform_id: platformId,
      account_url: accountUrl
    };
    return this.http.put(`${this.apiUrl}/artist-edit/social-media/${artistId}`, body);
  }

    changePassword( email: string,oldPassword: string,newPassword: string, confirmPassword: string): Observable<any> {
      return this.http.post(`${this.apiurl}/changePassword`, {email,oldPassword,newPassword, confirmPassword });
    }

}

