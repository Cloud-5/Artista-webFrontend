import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() selected: boolean = false;

  constructor() { }

  toggleSelection(): void {
    console.log('Toggle selection called');
    console.log('Selected before toggle:', this.selected);
    this.selected = !this.selected;
    console.log('Selected after toggle:', this.selected);
  }
   
}  
