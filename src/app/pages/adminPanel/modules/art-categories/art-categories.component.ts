import { Component, OnInit } from '@angular/core';
import { categoryData } from './categoryData';

@Component({
  selector: 'app-art-categories',
  templateUrl: './art-categories.component.html',
  styleUrl: './art-categories.component.css'
})
export class ArtCategoriesComponent{

  categoryData = categoryData;


}
                                                      