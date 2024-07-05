import { Component, OnInit } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-first-foryou',
  templateUrl: './first-foryou.component.html',
  styleUrls: ['./first-foryou.component.css']
})
export class FirstForyouComponent implements OnInit {

  categoryData: any[] = [];
  userId: string = localStorage.getItem('user_id') ? Number(localStorage.getItem('user_id')).toString() : '0';

  selectedCategoryIds: number[] = [];




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


  constructor(
    private preferencesService: PreferencesService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadCategoryData();
  };

  loadCategoryData(): void {
    this.preferencesService.showPreferences().subscribe((data: any[]) => {
      // console.log('Category data: ', data);
      //console.log('Category data: ', data[0].category_id);


      this.categoryData = data;

    }, (error) => {
      console.error('Error fetching category data: ', error);
    });


  }
  handleSelectionChange(event: { categoryId: number, selected: boolean }): void {
    const { categoryId, selected } = event;
    if (selected) {
      this.selectedCategoryIds.push(categoryId);
    } else {
      const index = this.selectedCategoryIds.indexOf(categoryId);
      if (index !== -1) {
        this.selectedCategoryIds.splice(index, 1);
      }
    }
    // console.log('Selected category IDs:', this.selectedCategoryIds);
    // You can perform further actions here, su ch as updating the database.
  }

  postPreferences(): void {
    console.log('Posting preferences', this.selectedCategoryIds);
    this.saveSelectedCategoryIds();
    this.preferencesService.addpreferences(this.userId, this.selectedCategoryIds).subscribe(
      (response) => {
        console.log('Preferences added successfully:', response);
        // You can handle success actions here, such as displaying a success message or redirecting the user.
        this.router.navigateByUrl('/foryou');
      },
      (error) => {
        console.error('Error adding preferences:', error);
        // You can handle error actions here, such as displaying an error message or retrying the request.
      }
    );
  }
  saveSelectedCategoryIds(): void {
    this.preferencesService.saveSelectedCategoryIds(this.selectedCategoryIds);
    console.log('Selected category IDs service:', this.selectedCategoryIds);
  }
  
}
