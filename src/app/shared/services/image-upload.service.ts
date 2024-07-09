import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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

  folderUpload(files: File[], folder: string, uploadType: string, subfolder: string ) {
    console.log('files', files, 'folder', folder, 'subfolder', subfolder, 'type', uploadType);
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file as Blob));
    
    const formDataEntries = formData as any;
    for (let pair of formDataEntries.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    const headers = new HttpHeaders({
      'uploadType': uploadType,
      'folder': folder,
      'subfolder': subfolder 
    });
    console.log('folder', folder, 'subfolder', subfolder, 'type', uploadType);
    return this.http.post('http://localhost:3000/uploadFolder', formData, { headers: headers });
  }

  deleteFolder(folder: string, subfolder: string) {
    const headers = new HttpHeaders({
      'folder': folder,
      'subfolder': subfolder
    });
    return this.http.delete('http://localhost:3000/deleteFolder', { headers: headers });
  }
  
}
