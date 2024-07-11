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
  artistId: string = localStorage.getItem('user_id') || '';
  artType: string = '2d';
  //fileName = '';
  isUploading = false;
  categories: any[] = [];

  //fileName: string | undefined;

  isUploading2D: boolean = false;
  isUploading3D: boolean = false;



  new3DArtwork: any = {
    title: '',
    price: '',
    artist:'',
    thumbnail_url: '',
    description: '',
    category_id: '',
    is3D: true,
    tag_name: [],
    tools: [],
    fileFormats: [],
    subfolder_name: '',
    modelBackground: '',
    original_url: ''
  };

  constructor(private uploadArtworksService: UploadArtworksService,private imageUploadService: ImageUploadService) {}

  ngOnInit(): void {

    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.new2DArtwork.artist = userId;
      this.new3DArtwork.artist = userId;
    }
    this.uploadArtworksService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });

    console.log('Categories', this.categories);
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
        this.new3DArtwork.subfolder_name = this.subfolderName;
        this.new3DArtwork.original_url = res.gltfFile;
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

  Tool_Name: string = '';
  Format_name: string = '';
  Tag_Name: string = '';

  addNew2DTag() {
    if (this.Tag_Name.trim() !== '') {
      this.new2DArtwork.tag_name.push({ tag_name: this.Tag_Name });
      this.Tag_Name = '';
    }
  }

  remove2DTag(index: number) {
    this.new2DArtwork.tag_name.splice(index, 1);
  }



  //for 2d form


  thumb: File | undefined;
  thumbUrl: string = '';
  bg: File | undefined;
  bgUrl: string = '';

  new2DArtwork:any={
    title:'',
    price:'',
    artist:'',
    thumbnail_url:'',
    description:'',
    category_id:'',
    is3D: false,
    tag_name: [],
    tools: [],
    fileFormats: []
   }

   addNewTool() {
    if (this.Tool_Name.trim() !== '') {
      this.new2DArtwork.tools.push({ tool_name: this.Tool_Name });
      this.Tool_Name = '';
    }
  }

  removeTool(index: number) {
    this.new2DArtwork.tools.splice(index, 1);
  }

  addNewFileFormat() {
    if (this.Format_name.trim() !== '') {
      this.new2DArtwork.fileFormats.push({ file_format_name: this.Format_name });
      this.Format_name = '';
    }
  }

  removeFileFormat(index: number) {
    this.new2DArtwork.fileFormats.splice(index, 1);
  }



  onFileSelected1(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.thumb = FILE;
  }
  onFileSelected2(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.bg = FILE;
  }

  onthumbUpload(folder: string, uploadType: string) {
    const imageForm = new FormData();
    imageForm.append('image', this.thumb as Blob);
    this.imageUploadService.imageUpload(imageForm, folder, uploadType).subscribe(
      (res: any) => {
        this.thumbUrl = res.image.location;
        if(this.artType === '3d'){
          this.new3DArtwork.thumbnail_url = this.thumbUrl;
        } else {
          this.new2DArtwork.thumbnail_url = this.thumbUrl;
        }
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

  onbgUpload(folder: string, uploadType: string) {
    const imageForm = new FormData();
    imageForm.append('image', this.bg as Blob);
    this.imageUploadService.imageUpload(imageForm, folder, uploadType).subscribe(
      (res: any) => {
        this.bgUrl = res.image.location;
        this.new3DArtwork.modelBackground = this.bgUrl;
        console.log('Image uploaded successfully:', this.bgUrl);
      });
  }

  removeBg() {
    if (this.bgUrl) {
      const key = this.bgUrl.split('/').pop();
      this.imageUploadService.removeImage(key as any).subscribe(
        () => {
          this.bgUrl = '';
          this.new3DArtwork.modelBackground = '';
        },
        (error) => {
          console.error('Error removing image:', error);
        }
      );
    }
  }

  async upload2DArtwork(): Promise<void> {
    try {
      const response = await this.uploadArtworksService.upload2DArtwork(this.new2DArtwork).toPromise();
      console.log('2D artwork upload successful', response);
      this.new2DArtwork = {
        title: '',
        price: '',
        thumbnail_url: '',
        description: '',
        category_id: '',
        is3D: false,
        tag_name: [],
        tools: [],
        fileFormats: []
      };
    } catch (error:any) {
      console.log('error upoading 2d artwork', error);
    }
  }

  async upload3DArtwork(): Promise<void> {
    try {

      const response = await this.uploadArtworksService.upload3DArtwork(this.new3DArtwork).toPromise();
      console.log('3D artwork upload successful', response);
      this.new3DArtwork = {
        title: '',
        price: '',
        thumbnail_url: '',
        description: '',
        category_id: '',
        is3D: true,
        tag_name: [],
        tools: [],
        fileFormats: [],
        subfolder_name: '',
        modelBackground: '',
        original_url: ''
      };
    } catch (error:any) {
      console.log('error upoading 3d artwork', error);
    }
  }
}
