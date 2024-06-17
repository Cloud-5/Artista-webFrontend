import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviorenment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private apiUrl: string = environment.apiUrl + '/preferences';
  selectedCategoryIds: number[] = []; // Define the array in the service

  constructor(private http:  HttpClient) {  }

  showPreferences(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  addpreferences( user_id:number, category_ids: any ): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, {user_id, category_ids});
  }
  
  // Function to save the selectedCategoryIds array
  saveSelectedCategoryIds(categoryIds: number[]): void {
    this.selectedCategoryIds = categoryIds;
  }

  // Function to get the saved selectedCategoryIds array
  getSelectedCategoryIds(): number[] {
    return this.selectedCategoryIds;
    console.log('Selected category IDs:', this.selectedCategoryIds);
  }
}
