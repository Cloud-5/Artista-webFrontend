import { Component, Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() selected: boolean = false;
  @Input() categoryId!:number ;
 
  @Output() selectionChange = new EventEmitter<{ categoryId: number, selected: boolean }>();
  
 
  constructor() { 
  }

  toggleSelection(): void {
    this.selected = !this.selected;
    this.selectionChange.emit({ categoryId: this.categoryId, selected: this.selected });
  }
   
}  
