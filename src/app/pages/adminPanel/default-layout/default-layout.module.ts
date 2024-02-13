import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './default-layout.component'; 

import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { ArtCategoriesComponent } from '../modules/art-categories/art-categories.component';
import { UserManagementComponent } from '../modules/user-management/user-management.component';


@NgModule({
  declarations: [
    DefaultLayoutComponent,
    DashboardComponent,
    ArtCategoriesComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class DefaultLayoutModule { }
