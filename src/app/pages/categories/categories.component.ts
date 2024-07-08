import { Component, OnInit } from '@angular/core';
import { PersonalizeService } from './personalize.service';
import { Router } from '@angular/router';
import { PreferencesService } from '../first-foryou/preferences.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  userId: string = localStorage.getItem('user_id') || '';
  categoryData: any[] = [];
  selectedCategoryIds: number[] = [];

  constructor(
    private personalizeService: PersonalizeService,
    private router: Router,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit: Fetching categories');
    this.getCategories();
  }

  getCategories(): void {
    console.log(`getCategories: Fetching categories for userId: ${this.userId}`);
    this.personalizeService.getCategories(this.userId).subscribe((data: any[]) => {
      console.log('Category data received: ', data);
      console.log('Category data: ', data);
      this.categoryData = data;
      this.selectedCategoryIds = data.filter(category => category.selected).map(category => category.category_id);
      console.log('Initial selected category IDs:', this.selectedCategoryIds);
      this.preferencesService.saveSelectedCategoryIds(this.selectedCategoryIds); // Persist selected category IDs
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
    this.preferencesService.saveSelectedCategoryIds(this.selectedCategoryIds); // Persist selected category IDs
  }

  postPreferences(): void {
    console.log('postPreferences: Posting preferences');
    if (this.selectedCategoryIds.length === 0) {
      alert('Please select at least one category.');
      console.log('No categories selected. Alert displayed to user.');
      return;
    }
    console.log('Selected category IDs to be posted:', this.selectedCategoryIds);
    this.personalizeService.updateCategories(this.userId, this.selectedCategoryIds).subscribe(
      (response) => {
        console.log('Preferences updated successfully:', response);
        console.log('Preferences updated successfully:', response);
        this.router.navigateByUrl('/foryou');
      },
      (error) => {
        console.error('Error updating preferences:', error);
      }
    );
  }
}
