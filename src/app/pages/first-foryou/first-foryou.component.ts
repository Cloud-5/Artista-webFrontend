import { Component,OnInit } from '@angular/core';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'app-first-foryou',
  templateUrl: './first-foryou.component.html',
  styleUrls: ['./first-foryou.component.css']
})
export class FirstForyouComponent implements OnInit {

  categoryData: any[]= [];


//   categories = [
//     { categoryId: 'cat1', imageUrl: '../assets/images/digitalIllustrations.jpg', title: 'Digital Illustrations', selected: false },
//     { categoryId: 'cat2', imageUrl: '../assets/images/3DIMG.jpg', title: '3D Art' , selected: false},
//     { categoryId: 'cat3', imageUrl: '../assets/images/3d.png', title: 'Digital Painting', selected: false },
//     { categoryId: 'cat4', imageUrl: '../assets/images/vectorArt.jpg', title: 'Vector Art', selected: false },
//     { categoryId: 'cat5', imageUrl: '../assets/images/pixelart.png', title: 'Pixel Art' , selected: false},
//     { categoryId: 'cat6', imageUrl: '../assets/images/motionArt.png', title: 'Motion Graphics', selected: false },
//     { categoryId: 'cat7', imageUrl: '../assets/images/generativeArts.jpg', title: 'Generative Art', selected: false },
//     { categoryId: 'cat8', imageUrl: '../assets/images/graphicDesign.jpg', title: 'Graphic Design', selected: false },
//     { categoryId: 'cat9', imageUrl: '../assets/images/digicol.jpg', title: 'Digital Collage', selected: false }
// ];


  constructor(private preferencesService:PreferencesService) { }


  ngOnInit() :void{
    this.loadCategoryData();};

    loadCategoryData(): void{
      this.preferencesService.showPreferences().subscribe((data: any[]) => {
        console.log('Category data: ', data);
        console.log('Category data: ', data[0].name);
   
        this.categoryData = data;
        
      }, (error) => {
        console.error('Error fetching category data: ', error);
      });
    
  
}

}
