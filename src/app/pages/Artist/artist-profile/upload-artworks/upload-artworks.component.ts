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

  //fileName: string | undefined;

  isUploading2D: boolean = false;
  isUploading3D: boolean = false;



Tag_Name: string = '';

  new3DArtwork: any = {
    title: '',
    price: '',
    thumbnail_url: '',
    description: '',
    published_date: '',
    category_id: '',
    is3D: true,
    tag_name: []
  };

  constructor(private uploadArtworksService: UploadArtworksService,private imageUploadService: ImageUploadService) {}

  ngOnInit(): void {
    this.uploadArtworksService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });

    console.log('Categories', this.categories);
  }


addNew2DTag() {
    if (this.Tag_Name.trim() !== '') {
      this.new2DArtwork.tag_name.push({ tag_name: this.Tag_Name });
      this.Tag_Name = '';
    }
  }

  remove2DTag(index: number) {
    this.new2DArtwork.tag_name.splice(index, 1);
  }


  addNew3DTag() {
    if (this.Tag_Name.trim() !== '') {
      this.new3DArtwork.tag_name.push({ tag_name: this.Tag_Name });
      this.Tag_Name = '';
    }
  }

  remove3DTag(index: number) {
    this.new3DArtwork.tag_name.splice(index, 1);
  }

  onArtworkTypeChange(event: any): void {
    this.artType = event.target.value;
    console.log(this.artType);
  }


  onSubmit2D(){
    console.log('2D artwork', this.new2DArtwork);
  }
  onSubmit3D(){
    console.log('3D artwork', this.new2DArtwork);
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


  //for 2d form

  thumb: File | undefined;
  thumbUrl: string = '';
  ori: File | undefined;
  OriUrl: string = '';

  new2DArtwork:any={
    title:'',
    price:'',
    thumbnail_url:'',
    original_url:'',
    description:'',
    category_id:'',
    is3D: false,
    tag_name: [],
   }


  onFileSelected1(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.thumb = FILE;
  }
  onFileSelected2(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.ori = FILE;
  }

  onthumbUpload(folder: string, uploadType: string) {
    const imageForm = new FormData();
    imageForm.append('image', this.thumb as Blob);
    this.imageUploadService.imageUpload(imageForm, folder, uploadType).subscribe(
      (res: any) => {
        this.thumbUrl = res.image.location;
        this.new2DArtwork.thumbnail_url = this.thumbUrl;
        console.log('Image uploaded successfully:', this.thumbUrl);

      });
  }

  removeThumb() {
    if (this.thumbUrl) {
      const key = this.thumbUrl.split('/').pop();
      this.imageUploadService.removeImage(key as any).subscribe(
        () => {
          this.thumbUrl = '';
          this.new2DArtwork.thumbnail_url = '';
          console.log('thumb removed successfully');
        },
        (error) => {
          console.error('Error removing image:', error);
        }
      );
    }
  }

  onOriginalUpload(folder: string, uploadType: string) {
    const imageForm = new FormData();
    imageForm.append('image', this.ori as Blob);
    this.imageUploadService.imageUpload(imageForm, folder, uploadType).subscribe(
      (res: any) => {
        this.OriUrl = res.image.location;
        this.new2DArtwork.original_url = this.OriUrl;
        console.log('Image uploaded successfully:', this.OriUrl);
      });
  }

  removeOri() {
    if (this.OriUrl) {
      const key = this.OriUrl.split('/').pop();
      this.imageUploadService.removeImage(key as any).subscribe(
        () => {
          this.OriUrl = '';
          this.new2DArtwork.original_url = '';
        },
        (error) => {
          console.error('Error removing image:', error);
        }
      );
    }
  }
}
