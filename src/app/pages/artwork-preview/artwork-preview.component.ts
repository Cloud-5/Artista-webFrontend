import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ArtworkPreviewService } from './artwork-preview.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-artwork-preview',
  templateUrl: './artwork-preview.component.html',
  styleUrl: './artwork-preview.component.css',
  animations: [
    trigger('toggleFavorite', [
        state('true', style({
          color: 'red', // Change color
        })),
        state('false', style({
          color: 'blue',
        })),
        transition('true <=> false', [
          animate('0.5s')
        ]),
      ]),
],
})
export class ArtworkPreviewComponent implements OnInit {

    userId: string = '1';
    artworkId: string = '3';
    is3D: boolean = true;
    artworkDetails: any = {};
    tags: string = ''
    tagsArray: string[] = [];

    imageUrl: string = 'https://test-artista.s3.ap-south-1.amazonaws.com/ford/scene.gltf'
  
    constructor(
        // private route: ActivatedRoute,
        private artworkService: ArtworkPreviewService
    ) { }
  
    ngOnInit() {
        // this.route.params.subscribe(params => {
        //     this.artworkId = params['id'];
        //     this.loadArtworkDetails(this.artworkId);
        // })
        this.loadArtworkDetails(this.artworkId);
    }


    loadArtworkDetails(artworkId: string): void {
        this.artworkService.getArtworkDetails(artworkId).subscribe(
            (data: any) => {
                this.artworkDetails = data.artworkDetails[0]; 
                this.tags = this.artworkDetails.tags;
                this.tagsArray = this.tags.split(',');
            },
            (error) => {
                console.error('Error fetching artwork details:', error);
            }
        );
    }

    loadComments(artworkId: string): void {
        this.artworkService.getArtworkDetails(artworkId).subscribe(
            (data:any) => {
                this.artworkDetails = data.artworkDetails[1];
                console.log('Comments:', this.artworkDetails[1]);
            },
            (error)=> {
                console.error('Error fetching comments:', error);
            }
        )
    }
    

    isFavorite: boolean = false;

    showStickyBar: boolean = false;

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }

    isFollowing: boolean = false;
    followButtonText: string = "Follow";
    followButtonClass: string = "follow";

    toggleFollow(){
        this.isFollowing = !this.isFollowing;
        if(this.isFollowing){
            this.followButtonText = "Following";
            this.followButtonClass = "following";
        }
        else{
            this.followButtonText = "Follow";
            this.followButtonClass = "follow";
        }
    }

    isAddedToGallery: boolean = false;
    addToGalleryButtonText: string = "Add to Gallery";
    addToGalleryButtonClass: string = "add-to-gallery";

    toggleAddToGallery(){
        this.isAddedToGallery = !this.isAddedToGallery;
        if(this.isAddedToGallery){
            this.addToGalleryButtonText = "Added to Gallery";
            this.addToGalleryButtonClass = "added-to-gallery";
        }
        else{
            this.addToGalleryButtonText = "Add to Gallery";
            this.addToGalleryButtonClass = "add-to-gallery";
        }
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

        this.showStickyBar = scrollPosition > screenHeight;
    }
}
