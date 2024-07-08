import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadArtworksService } from './upload-artworks.service';
import { ImageUploadService } from '../../../../shared/services/image-upload.service';

@Component({
  selector: 'app-upload-artworks',
  templateUrl: './upload-artworks.component.html',
  styleUrls: ['./upload-artworks.component.css']
})
export class UploadArtworksComponent {
  artType: string = '2d';
  //fileName = '';
  isUploading = false;

  fileName: string | undefined;
  isUploading2D: boolean = false;
  isUploading3D: boolean = false;
  

  constructor(private uploadArtworksService: UploadArtworksService, private imageUploadService: ImageUploadService) {}

  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  onArtTypeChange(event: any): void {
    this.artType = event.target.value;
    console.log(this.artType);
  }

  onArtworkTypeChange() {
    // Reset form-specific variables or perform any specific actions
    this.fileName = undefined;
  }


  onSubmit2D(form: NgForm) {
    if (form.valid) {
      this.isUploading = true;
      const formData = form.value;
      formData.tags = formData.tags.split(',').map((tag: string) => tag.trim());

      this.uploadArtworksService.addArtworkByArtist(formData).subscribe(
        (response: any) => {
          console.log('2D artwork upload successful', response);
          this.isUploading = false;
        },
        (error: any) => {
          console.error('2D artwork upload error', error);
          this.isUploading = false;
        }
      );
    }
  }

  onSubmit3D(form: NgForm) {
    if (form.valid) {
      this.isUploading = true;
      const formData = form.value;
      formData.tags = formData.tags.split(',').map((tag: string) => tag.trim());

      this.uploadArtworksService.addArtworkByArtist(formData).subscribe(
        (response: any) => {
          console.log('3D artwork upload successful', response);
          this.isUploading = false;
        },
        (error: any) => {
          console.error('3D artwork upload error', error);
          this.isUploading = false;
        }
      );
    }
  }

  files: any[] = [];
  subfolderName:string = '';

  onFolderSelect(event: any) {
    const folder = event.target.files;
    if (folder.length > 0) {
      this.files = Array.from(folder);
    }
    console.log('files: ',this.files);
  }
  
  newFolderUpload(folder: string, uploadType: string) {
    const subfolderName = `Subfolder_${Date.now()}`;
    this.imageUploadService.folderUpload(this.files, folder, uploadType, subfolderName).subscribe((res: any) => {
      if (res.gltfFile) {
        this.subfolderName = res.subfolderName;
        console.log('3D artwork upload successful', res);
        console.log('3D artwork', res.gltfFile);
      } else {
        console.log('3D artwork upload UNsuccessful', res);
      }
    });
  }
  
  deleteFolder(folder: string) {
    if (this.subfolderName) {
      this.imageUploadService.deleteFolder(folder, this.subfolderName).subscribe((res: any) => {
        if (res.success) {
          console.log('Subfolder deleted successfully', res);
          this.subfolderName = '';
        } else {
          console.log('Failed to delete subfolder', res);
        }
      });
    } else {
      console.log('No subfolder to delete');
    }
  }
  
}
