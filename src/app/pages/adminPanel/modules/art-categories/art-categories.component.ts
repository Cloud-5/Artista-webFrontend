import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../shared/services/modal.service';
import { ArtCategoriesService } from './art-categories.service';

@Component({
  selector: 'app-art-categories',
  templateUrl: './art-categories.component.html',
  styleUrl: './art-categories.component.css'
})
export class ArtCategoriesComponent{

  categoryData: any[] = [];

  constructor(public modalService: ModalService,private artCategoriesService: ArtCategoriesService) { }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.artCategoriesService.getAllCategories().subscribe(
      (data: any) => {
        this.categoryData = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }
  deleteCategory(categoryId: string): void {
    this.artCategoriesService.deleteCategory(categoryId).subscribe(
      () => {
        this.categoryData = this.categoryData.filter(category => category.category_id !== categoryId);
        console.log('Category deleted successfully');
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
  
}
