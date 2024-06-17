import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent  {


  @Input() artist: any ;
  
  constructor() { }
 
  

 

  formatCrationCount(creationCount:number):string{
    if (creationCount < 1000) {
      return creationCount.toString();
    }else if (creationCount < 1000000) {
        return (creationCount / 1000).toFixed(1) + 'K';
      } else {
        return (creationCount / 1000000).toFixed(1) + 'M';
      }
  }

}
