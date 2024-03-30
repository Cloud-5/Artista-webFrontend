import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../shared/services/modal.service';
import { ArtCategoriesService } from './art-categories.service';
import { response } from 'express';

@Component({
  selector: 'app-art-categories',
  templateUrl: './art-categories.component.html',
  styleUrl: './art-categories.component.css'
})
export class ArtCategoriesComponent implements OnInit {

  categoryData: any[] = [];
  newCategory: any = {
    name: '',
    description: '',
    margin: '',
    formats: []
  };

  newFormat: string = '';

  addNewFormat(){
    if(this.newFormat.trim() !== ''){
      this.newCategory.formats.push({format_name: this.newFormat});
      this.newFormat = '';
    }
  }

  addFormat() {
    this.newCategory.formats.push({ format_name: '' });
  }

  removeFormat(index: number) {
    this.newCategory.formats.splice(index, 1);
  }

  constructor(public modalService: ModalService, private artCategoriesService: ArtCategoriesService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.artCategoriesService.getAllCategories().subscribe(
      (data: any) => {
        this.categoryData = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  addCategory(categoryForm: any): void {
    if (categoryForm.valid) {
      this.artCategoriesService.createCategory(this.newCategory).subscribe(
        (response: any) => {
          console.log('Category Added successfully', response);
          this.categoryData.push(response);
          this.loadCategories();
          categoryForm.reset();
          this.newCategory = {};
          this.modalService.close();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  openEditModal(category: any): void {
    // Set the newCategory object with the selected category data
    this.newCategory = {
        ...category,
        formats: category.formats.map((format: any) => ({ format_name: format.format_name }))
    };
    // Open the modal
    this.modalService.open('modal-editCategory');
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

  updateCategory(categoryForm: any): void {
    if (categoryForm.valid) {
      const categoryId = this.newCategory.category_id; // Assuming category_id exists in the newCategory object
      this.artCategoriesService.updateCategory(categoryId, this.newCategory).subscribe(
        (response: any) => {
          console.log('Category Updated successfully', response);
          // Update the category data in categoryData array
          const index = this.categoryData.findIndex(category => category.category_id === categoryId);
          if (index !== -1) {
            this.categoryData[index] = this.newCategory;
          }
          // Close the modal
          this.modalService.close();
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  }
}
