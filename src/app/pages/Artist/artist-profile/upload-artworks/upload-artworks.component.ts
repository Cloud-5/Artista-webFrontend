import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadArtworksService } from './upload-artworks.service';

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

  constructor(private uploadArtworksService: UploadArtworksService) {}

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
}
