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
  categories: any[] = [];

  fileName: string | undefined;
  isUploading2D: boolean = false;
  isUploading3D: boolean = false;

  new2DArtwork:any={
   artwork_id:'',
   title:'',
   price:'',
   thumbnail_url:'',
   description:'',
   published_date:'',
   category_id:'',
   is3D:'',
   tag_name: [],
    }

 

  new2DTag_Name: string = '';
  new3DTag_name: string = '';


  new3DArtwork: any = {
    artwork_id: '',
    title: '',
    price: '',
    thumbnail_url: '',
    description: '',
    published_date: '',
    category_id: '',
    is3D: true, // Set true for 3D artwork
    tag_name: []
  };




addNew2DTag() {
    if (this.new2DTag_Name.trim() !== '') {
      this.new2DArtwork.tag_name.push({ tag_name: this.new2DTag_Name });
      this.new2DTag_Name = '';
    }
  }

  remove2DTag(index: number) {
    this.new2DArtwork.tag_name.splice(index, 1);
  }




  //33333ddddddd
  addNew3DTag() {
    if (this.new3DTag_name.trim() !== '') {
      this.new3DArtwork.tag_name.push({ tag_name: this.new3DTag_name });
      this.new3DTag_name = '';
    }
  }

  remove3DTag(index: number) {
    this.new3DArtwork.tag_name.splice(index, 1);
  }













  constructor(private uploadArtworksService: UploadArtworksService,private imageUploadService: ImageUploadService) {}

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

  onSubmit2D(){
    console.log('2D artwork', this.new2DArtwork);
  }


  // onSubmit2D(form: NgForm) {
  //   if (form.valid) {
  //     this.isUploading = true;
  //     const formData = form.value;
  //     formData.tags = formData.tags.split(',').map((tag: string) => tag.trim());

  //     this.uploadArtworksService.addArtworkByArtist(formData).subscribe(
  //       (response: any) => {
  //         console.log('2D artwork upload successful', response);
  //         this.isUploading = false;
  //       },
  //       (error: any) => {
  //         console.error('2D artwork upload error', error);
  //         this.isUploading = false;
  //       }
  //     );
  //   }
  // }

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


  upload2DArtwork(): void {
    this.isUploading2D = true;
    console.log('2D artwork', this.new2DArtwork);
    this.uploadArtworksService.addArtworkByArtist(this.new2DArtwork).subscribe(
      (response: any) => {
        console.log('2D artwork upload successful', response);
        this.isUploading2D = false;
      },
      (error: any) => {
        console.error('2D artwork upload error', error);
        this.isUploading2D = false;
      }
    );
  }


  upload3DArtwork(): void {
    this.isUploading3D = true;
    console.log('3D artwork', this.new3DArtwork);
    this.uploadArtworksService.addArtworkByArtist(this.new3DArtwork).subscribe(
      (response: any) => {
        console.log('3D artwork upload successful', response);
        this.isUploading3D = false;
      },
      (error: any) => {
        console.error('3D artwork upload error', error);
        this.isUploading3D = false;
      }
    );
  }

  ngOnInit(): void {
    this.uploadArtworksService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });

    console.log('Categories', this.categories);
  }

  files: any[] =[];
  subfolderName: string = '';

  onFolderSelect(event: any) {
    const folder = event.target.files;
    if(folder.length > 0){
      this.files = Array.from(folder);
    }
  }
  newFolderUpload(folder: string, uploadType: string) {
    const subfolderName = `Subfolder_${Date.now()}`; 
    this.imageUploadService.folderUpload(this.files, folder,uploadType, subfolderName).subscribe((res: any) => {
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
      this.imageUploadService.deleteFolder(folder, this.subfolderName).subscribe(
        () => {
          console.log('Folder deleted successfully');
          // Reset the subfolderName
          this.subfolderName = '';
        },
        (error) => {
          console.error('Error deleting folder', error);
        }
      );
    } else {
      console.error('No subfolder name available to delete');
    }
  }


}
