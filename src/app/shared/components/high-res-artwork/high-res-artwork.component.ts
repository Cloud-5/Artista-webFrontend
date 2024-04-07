import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-high-res-artwork',
  templateUrl: './high-res-artwork.component.html',
  styleUrl: './high-res-artwork.component.css'
})
export class HighResArtworkComponent {

  @Input() artworkUrl: string = '';
  @Input() artworkType: string = '';  

}
