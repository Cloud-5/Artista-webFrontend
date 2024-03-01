import { Component, OnInit } from '@angular/core';
import { categoryData } from './categoryData';
import { ModalService } from '../../../../shared/services/modal.service';


@Component({
  selector: 'app-art-categories',
  templateUrl: './art-categories.component.html',
  styleUrl: './art-categories.component.css'
})
export class ArtCategoriesComponent{

  categoryData = categoryData;

  constructor(public modalService: ModalService) { }

  openAddCategoryModal(){
    this.modalService.open('modal-addCategory');
  }


}
                                                      