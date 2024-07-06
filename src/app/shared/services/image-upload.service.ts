import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  imageUpload(imageForm: FormData) {
    return this.http.post('http://localhost:3000/upload', imageForm);
  }

  removeImage(key: any) {
    return this.http.delete(`http://localhost:3000/delete/${key}`);
  }
}
