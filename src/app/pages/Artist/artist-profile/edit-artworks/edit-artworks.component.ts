import { EditArtworksService } from './edit-artworks.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UploadArtworksService } from '../upload-artworks/upload-artworks.service';
import { ImageUploadService } from '../../../../shared/services/image-upload.service';
import { ArtworkPreviewService } from '../../../artwork-preview/artwork-preview.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-artworks',
  templateUrl: './edit-artworks.component.html',
  styleUrl: './edit-artworks.component.css',
})
export class EditArtworksComponent implements OnInit {
  artistId: string = localStorage.getItem('user_id') || '';
  artType: string = '';
  //fileName = '';
  isUploading = false;
  categories: any[] = [];

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
  bg: string = '';
  artworkIdNew = '';

  file1SizeError = false;
  file2SizeError = false;
  folderSizeError = false;
  titlePatternError = false;
  descriptionLengthError = false;
  isUploadingFolder: boolean = false;
  uploadProgress: number = 0;
  routeSub: Subscription | undefined;

  constructor(
    private uploadArtworksService: UploadArtworksService,
    private imageUploadService: ImageUploadService,
    private editArtworksService: EditArtworksService,
    private route: ActivatedRoute

  ) {}

  validateForm(type: string) {
    if (type === '2d') {
      this.titlePatternError = !/^[a-zA-Z\s]*$/.test(this.editing2dArtwork.title);
      this.descriptionLengthError = this.editing2dArtwork.description.length > 500;
    } else if (type === '3d') {
      this.titlePatternError = !/^[a-zA-Z\s]*$/.test(this.editing3DArtwork.title);
      this.descriptionLengthError = this.editing3DArtwork.description.length > 500;
    }
  }

  formIsValid(type: string): boolean {
    if (type === '2d') {
      return (
        !this.file1SizeError &&
        !this.titlePatternError &&
        !this.descriptionLengthError
      );
    } else if (type === '3d') {
      return (
        !this.file1SizeError &&
        !this.file2SizeError &&
        !this.folderSizeError &&
        !this.titlePatternError &&
        !this.descriptionLengthError
      );
    }
    return false;
  }

  // loadArtworkDetails(artworkId: string, userId: string): void {
  //   this.artworkService.getArtworkDetails(artworkId, userId).subscribe(
  //     (data: any) => {
  //       this.artworkDetails = data.artworkDetails[0];
  //       console.log(this.artworkDetails);
  //       this.imageUrl = this.artworkDetails.url_link;
  //       this.bg = this.artworkDetails.background;
  //       this.thumbnail = this.artworkDetails.thumbnail;
  //       this.customer_profile_photo = this.artworkDetails.customer_profile_photo;

  //       if(this.artworkDetails.category === '3D Modeling'){
  //         this.is3D = true;
  //       } else {
  //         this.is3D = false;
  //       }
  //       if (this.artworkDetails.tags) {
  //         this.tags = this.artworkDetails.tags;
  //         this.tagsArray = this.tags.split(',');
  //       } else {
  //         this.tags = '';
  //         this.tagsArray = [];
  //       }
  //       this.isFavorite = this.artworkDetails.is_liked;
  //       this.isFollowing = this.artworkDetails.is_following;
  //       this.isAddedToGallery = this.artworkDetails.is_addedToGallery;

  //     },
  //     (error) => {
  //       console.error('Error fetching artwork details:', error);
  //     }
  //   );
  // }

  //my ts files

  artwork_id:number = 0;

  editing3DArtwork: any = {
    title: '',
    price: '',
    artist: '',
    thumbnail_url: '',
    description: '',
    category_id: '',
    is3D: true,
    subfolder_name: '',
    modelBackground: '',
    original_url: '',
  };
  editing2dArtwork:any = {
    title: '',
    price: '',
    artist: '',
    thumbnail_url: '',
    description: '',
    category_id: '',
    is3D: false,
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.artwork_id = params['artworkId'];
    })
    this.uploadArtworksService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
    this.loadArtworkDetails(this.artwork_id);
  }
  // ngOnDestroy(): void {
  //   this.routeSub.unsubscribe();
  // }

  // addNew3DTag() {
  //   if (this.Tag_Name.trim() !== '') {
  //     this.editing3DArtwork.tag_name.push({ tag_name: this.Tag_Name });
  //     this.Tag_Name = '';
  //   }
  // }

  // remove3DTag(index: number) {
  //   this.editing3DArtwork.tag_name.splice(index, 1);
  // }

  onArtworkTypeChange(event: any): void {
    this.artType = event.target.value;
    console.log(this.artType);
  }

  loadArtworkDetails(artwork_id:number){
    this.editArtworksService.getArtworkDetails(artwork_id).subscribe(
      (data:any) => {
        if(data.artwork.is3D){
          this.editing3DArtwork = data.artwork;
          this.artType = '3d';
          this.is3D = true;
          this.bg = this.editing3DArtwork.modelBackground
          this.imageUrl = this.editing3DArtwork.original_url
          this.subfolderName = this.editing3DArtwork.subfolder_name
          this.thumbUrl = this.editing3DArtwork.thumbnail_url
          console.log('3d artwork', this.editing3DArtwork);
        } else {
          this.editing2dArtwork = data.artwork;
          this.artType = '2d';
          this.is3D = false;
          this.thumbUrl = this.editing2dArtwork.thumbnail_url;
          console.log('2d artwork', this.editing2dArtwork);
        }
      }
    )
  }

  onSubmit2D() {
    console.log('2D artwork', this.editing2dArtwork);
  }
  onSubmit3D() {
    console.log('3D artwork', this.editing2dArtwork);
  }

  files: any[] = [];
  subfolderName: string = '';

  onFolderSelect(event: any) {
    const folder = event.target.files;
    if (folder.length > 0) {
      this.files = Array.from(folder);
    }
  }

  newFolderUpload(folder: string, uploadType: string) {
    this.isUploadingFolder = true;
    this.uploadProgress = 0;

    const uploadInterval = setInterval(() => {
      if (this.uploadProgress < 100) {
        this.uploadProgress += 10; // increment progress
      } else {
        clearInterval(uploadInterval);
        this.isUploadingFolder = false; // hide loader when upload is complete
      }
    }, 300); // update every 300ms

    const subfolderName = `Subfolder_${Date.now()}`;

    this.imageUploadService.folderUpload(this.files, folder, uploadType, subfolderName).subscribe((res: any) => {
        if (res.gltfFile) {
          this.subfolderName = res.subfolderName;
          this.editing3DArtwork.subfolder_name = this.subfolderName;
          this.editing3DArtwork.original_url = res.gltfFile;
          console.log('3D artwork upload successful', res);
          console.log('3D artwork', res.gltfFile);
        } else {
          console.log('3D artwork upload UNsuccessful', res);
        }
      });
  }

  deleteFolder(folder: string) {
    if (this.subfolderName) {
      this.imageUploadService
        .deleteFolder(folder, this.subfolderName)
        .subscribe(
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
  bg1: File | undefined;
  thumbUrl: string = '';
  bgUrl: string = '';

  // addNewTool() {
  //   if (this.Tool_Name.trim() !== '') {
  //     this.editing2dArtwork.tools.push({ tool_name: this.Tool_Name });
  //     this.Tool_Name = '';
  //   }
  // }

  // removeTool(index: number) {
  //   this.editing2dArtwork.tools.splice(index, 1);
  // }

  // addNewFileFormat() {
  //   if (this.Format_name.trim() !== '') {
  //     this.editing2dArtwork.fileFormats.push({
  //       file_format_name: this.Format_name,
  //     });
  //     this.Format_name = '';
  //   }
  // }

  removeFileFormat(index: number) {
    this.editing2dArtwork.fileFormats.splice(index, 1);
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
    this.imageUploadService
      .imageUpload(imageForm, folder, uploadType)
      .subscribe((res: any) => {
        this.thumbUrl = res.image.location;
        if (this.artType === '3d') {
          this.editing3DArtwork.thumbnail_url = this.thumbUrl;
        } else {
          this.editing2dArtwork.thumbnail_url = this.thumbUrl;
        }
        this.editing2dArtwork.thumbnail_url = this.thumbUrl;
        console.log('Image uploaded successfully:', this.thumbUrl);
      });
  }

  removeThumb() {
    if (this.thumbUrl) {
      const key = this.thumbUrl.split('/').pop();
      this.imageUploadService.removeImage(key as any).subscribe(
        () => {
          this.thumbUrl = '';
          this.editing2dArtwork.thumbnail_url = '';
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
    this.imageUploadService
      .imageUpload(imageForm, folder, uploadType)
      .subscribe((res: any) => {
        this.bgUrl = res.image.location;
        this.editing3DArtwork.modelBackground = this.bgUrl;
        console.log('Image uploaded successfully:', this.bgUrl);
      });
  }

  removeBg() {
    if (this.bgUrl) {
      const key = this.bgUrl.split('/').pop();
      this.imageUploadService.removeImage(key as any).subscribe(
        () => {
          this.bgUrl = '';
          this.editing3DArtwork.modelBackground = '';
        },
        (error) => {
          console.error('Error removing image:', error);
        }
      );
    }
  }

  async upload2DArtwork(): Promise<void> {

  }

  async upload3DArtwork(): Promise<void> {
    console.log(this.editing3DArtwork,'editing 3d')
    this.editArtworksService.update3d(this.artwork_id, this.editing3DArtwork).subscribe(
      (response:any)=> {
        console.log('3d artwork updated', response);
      },
      (error) => {
        console.error('Error updating 3d artwork', error);
      }
    )
  }


}
