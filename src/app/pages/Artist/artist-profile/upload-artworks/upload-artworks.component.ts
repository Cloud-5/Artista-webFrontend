import { UploadArtworksService } from './upload-artworks.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { title } from 'process';


@Component({
  selector: 'app-upload-artworks',
  templateUrl: './upload-artworks.component.html',
  styleUrl: './upload-artworks.component.css'
})
export class UploadArtworksComponent {
uploadForm: FormGroup;
fileName = '';
isUploading = false;

constructor(private fb:FormBuilder,private uploadArtworksService:UploadArtworksService){
  this.uploadForm =this.fb.group({
    artworkFile:[null,Validators.required],
    title:['',Validators.required],
    keywords:['',Validators.required],
    price:['',Validators.required,Validators.pattern('^[0-9]*$')],
    category:['',Validators.required],
    description:['',Validators.required],
    tags:['',Validators.required],

  });
}
onFileSelect(event :any){
  const file : File= event.target.files[0];
if(file){
  this.fileName =file.name;
  this.uploadForm.patchValue({
    artworkFile:file
  });
}
}


onSubmit(){
  if(this.uploadForm.valid){
    this.isUploading=true;
    const formData = this.uploadForm.value;
    formData.tags = formData.tags.split(',').map((tag: string)=>tag.trim());

    this.uploadArtworksService.addArtworkByArtist(formData).subscribe((response: any)=>{
      console.log('upload Successfull',response);
      this.isUploading=false;

    },
      (  error: any)=>{
    console.error('artwork upload by artist error',error);
    this.isUploading=false;
  }
);
  }
}



}
