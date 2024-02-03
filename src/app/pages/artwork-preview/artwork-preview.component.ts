import { Component, OnInit, HostListener } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommentListComponent } from '../../shared/components/comments/comment-list/comment-list.component';


@Component({
  selector: 'app-artwork-preview',
  templateUrl: './artwork-preview.component.html',
  styleUrl: './artwork-preview.component.css',
  animations: [
    trigger('toggleFavorite', [
        state('filled', style({
            color: 'red', // Change color to your desired filled color
        })),
        state('border', style({
            color: 'blue',
        })),
        transition('filled => border', [
            animate('0.5s')
        ]),
        transition('border => filled', [
            animate('0.5s')
        ]),
    ]),
],
})
export class ArtworkPreviewComponent implements OnInit {

    selectedArtworkType: string = '';
    selectedArtworkUrl: string = '';
  
    constructor() { }
  
    ngOnInit() {
    }
    isFavorite: boolean = false;
    totalLikes: number = 10;
    pDate: Date = new Date(2019, 1, 1);
    artworkTitle: string = 'Day Dreaming';
    artistName: string = 'Walter White';
    artistLocation: string = 'Albuquerque, NM';
    dimensions: string = '24" x 36"';
    artworkCategory: string = 'Doodle';
    price: number = 8043.99;
    artistRate:number = 4.5;
    artistFollowers: number = 100;
    artistArtworks: number = 10;
    commentCount: number = 34;

    showStickyBar: boolean = false;

    artworkTools: string[] = ['Jupyter', 'Adobe Illustrator'];
    fileFormats: string[] = ['PDF', 'PNG', 'JPG'];

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
