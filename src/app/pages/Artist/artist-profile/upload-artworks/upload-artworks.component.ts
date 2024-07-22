import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadArtworksService } from './upload-artworks.service';
import { ImageUploadService } from '../../../../shared/services/image-upload.service';
import { ArtworkPreviewService } from '../../../artwork-preview/artwork-preview.service';

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

  //buddi previewArtwork
  is3D: boolean = false;
  artworkDetails: any = {};
  imageUrl: string = '';
  thumbnail: string = '';
  customer_profile_photo: string = '';
  tags: string = '';
  tagsArray: string[] = [];
  isFavorite: boolean = false;
  showStickyBar: boolean = false;
  isFollowing: boolean = false;
  followButtonText: string = '';
  followButtonClass: string = '';
  isAddedToGallery: boolean = false;
  addToGalleryButtonText: string = 'Add to Gallery';
  addToGalleryButtonClass: string = 'add-to-gallery';
  bg:string='';


  file1SizeError = false;
  file2SizeError = false;
  folderSizeError = false;
  titlePatternError = false;
  descriptionLengthError = false;
  isUploadingFolder: boolean = false;
  uploadProgress: number = 0;



  constructor(private uploadArtworksService: UploadArtworksService,private imageUploadService: ImageUploadService , private artworkService: ArtworkPreviewService) {}


    validateForm(type: string) {
    if (type === '2d') {
      this.titlePatternError = !/^[a-zA-Z\s]*$/.test(this.new2DArtwork.title);
      this.descriptionLengthError = this.new2DArtwork.description.length > 500;
    } else if (type === '3d') {
      this.titlePatternError = !/^[a-zA-Z\s]*$/.test(this.new3DArtwork.title);
      this.descriptionLengthError = this.new3DArtwork.description.length > 500;
    }
  }

  formIsValid(type: string): boolean {
    if (type === '2d') {
      return !this.file1SizeError && !this.titlePatternError && !this.descriptionLengthError;
    } else if (type === '3d') {
      return !this.file1SizeError && !this.file2SizeError && !this.folderSizeError && !this.titlePatternError && !this.descriptionLengthError;
    }
    return false;
  }



  loadArtworkDetails(artworkId: string, userId: string): void {
    this.artworkService.getArtworkDetails(artworkId, userId).subscribe(
      (data: any) => {
        this.artworkDetails = data.artworkDetails[0];
        console.log(this.artworkDetails);
        this.imageUrl = this.artworkDetails.url_link;
        this.bg = this.artworkDetails.background;
        this.thumbnail = this.artworkDetails.thumbnail;
        this.customer_profile_photo = this.artworkDetails.customer_profile_photo;

        if(this.artworkDetails.category === '3D Modeling'){
          this.is3D = true;
        } else {
          this.is3D = false;
        }
        if (this.artworkDetails.tags) {
          this.tags = this.artworkDetails.tags;
          this.tagsArray = this.tags.split(',');
        } else {
          this.tags = '';
          this.tagsArray = [];
        }
        this.isFavorite = this.artworkDetails.is_liked;
        this.isFollowing = this.artworkDetails.is_following;
        this.isAddedToGallery = this.artworkDetails.is_addedToGallery;

      },
      (error) => {
        console.error('Error fetching artwork details:', error);
      }
    );
  }






  //my ts files

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




  // newFolderUpload(folder: string, uploadType: string) {

  //   this.isUploadingFolder = true;
  //   this.uploadProgress = 0;

  //   const uploadInterval = setInterval(() => {
  //     if (this.uploadProgress < 100) {
  //       this.uploadProgress += 10; // increment progress
  //     } else {
  //       clearInterval(uploadInterval);
  //       this.isUploadingFolder = false; // hide loader when upload is complete
  //     }
  //   }, 300); // update every 300ms

  //   const subfolderName = `Subfolder_${Date.now()}`;
  //   this.imageUploadService.folderUpload(this.files, folder,uploadType, subfolderName).subscribe((res: any) => {
  //     if (res.gltfFile) {
  //       this.subfolderName = res.subfolderName;
  //       this.new3DArtwork.subfolder_name = this.subfolderName;
  //       this.new3DArtwork.original_url = res.gltfFile;
  //       console.log('3D artwork upload successful', res);
  //       console.log('3D artwork', res.gltfFile);
  //     } else {
  //       console.log('3D artwork upload UNsuccessful', res);
  //     }
  //   });
  // }

  uploadMessage = '';

  newFolderUpload(folder: string, uploadType: string) {
    this.isUploadingFolder = true;
    this.uploadProgress = 0;
    this.uploadMessage = 'Uploading Folder...';

    const uploadInterval = setInterval(() => {
      if (this.uploadProgress < 100) {
        this.uploadProgress += 10; // increment progress
      } else {
        clearInterval(uploadInterval);
        this.isUploadingFolder = false; // hide loader when upload is complete
      }
    }, 300); // update every 300ms

    const subfolderName = `Subfolder_${Date.now()}`;
    this.imageUploadService.folderUpload(this.files, folder, uploadType, subfolderName).subscribe(
      (res: any) => {
        if (res.gltfFile) {
          this.subfolderName = res.subfolderName;
          this.new3DArtwork.subfolder_name = this.subfolderName;
          this.new3DArtwork.original_url = res.gltfFile;
          this.uploadMessage = '3D artwork upload successful';
          console.log('3D artwork upload successful', res);
          console.log('3D artwork', res.gltfFile);
        } else {
          this.uploadMessage = '3D artwork upload unsuccessful';
          console.log('3D artwork upload unsuccessful', res);
        }
        this.isUploadingFolder = false;
        this.uploadProgress = 100; // set progress to 100% after completion
      },
      (error) => {
        this.uploadMessage = '3D artwork upload failed';
        console.error('Error uploading 3D artwork', error);
        this.isUploadingFolder = false;
        this.uploadProgress = 0; // reset progress on error
      }
    );
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
  bg1: File | undefined;
  thumbUrl: string = '';
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
    this.bg1 = FILE;
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
    imageForm.append('image', this.bg1 as Blob);
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
      console.log('2D artwork==================', this.new2DArtwork);
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

  addNewTool1() {
    if (this.Tool_Name.trim() !== '') {
      this.new3DArtwork.tools.push({ tool_name: this.Tool_Name });
      this.Tool_Name = '';
    }
  }

  removeTool1(index: number) {
    this.new3DArtwork.tools.splice(index, 1);
  }

  addNewFileFormat1() {
    if (this.Format_name.trim() !== '') {
      console.log('file format', this.Format_name);
      this.new3DArtwork.fileFormats.push({ file_format_name: this.Format_name });
      this.Format_name = '';
    }
  }

  removeFileFormat1(index: number) {
    this.new3DArtwork.fileFormats.splice(index, 1);
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
