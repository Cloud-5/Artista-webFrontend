import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { St01Component } from './pages/sign-up/sign-up-art enthusiast/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-art enthusiast/st02/st02.component';
import { St1Component } from './pages/sign-up/sign-up-artist/st1/st1.component';
import { St2Component } from './pages/sign-up/sign-up-artist/st2/st2.component';
import { ResetPasswordComponent } from './pages/fogot-password/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/fogot-password/new-password/new-password.component';
import { MessageComponent } from './pages/message/message/message.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'login', component :SignInComponent
  },
  {
    path:'st1', component: St1Component
  },
  {
    path:'st01', component: St01Component
  },
  {
    path:'st2', component: St2Component
  },
  {
    path:'st02', component: St02Component
  },
  {
    path:'helpCenter', component: HelpCenterComponent
  },

  {
    path:'reset', component: ResetPasswordComponent
  },
  {
    path:'new', component: NewPasswordComponent
  },
  
  {
    path:'message', component :MessageComponent
  }


import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { DefaultLayoutComponent } from './pages/adminPanel/default-layout/default-layout.component';
import { DashboardComponent } from './pages/adminPanel/modules/dashboard/dashboard.component';
import { ArtCategoriesComponent } from './pages/adminPanel/modules/art-categories/art-categories.component';
import { UserManagementComponent } from './pages/adminPanel/modules/user-management/user-management.component';
import { ArtistRequestsComponent } from './pages/adminPanel/modules/artist-requests/artist-requests.component';
import { ModelComponent } from './shared/components/model/model.component';

const routes: Routes = [
  { path: 'art-p', component: ArtworkPreviewComponent },
  { path: 'model', component: ModelComponent},
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'art-categories', component: ArtCategoriesComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'artist-requests', component: ArtistRequestsComponent },
    ],
  },
  { path: '', redirectTo: '/art-p', pathMatch: 'full' }, // Redirect to artwork-preview by default
  { path: '**', redirectTo: '/art-p' }, // Redirect to artwork-preview for any other unknown routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
