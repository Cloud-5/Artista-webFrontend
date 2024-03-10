import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { St01Component } from './pages/sign-up/sign-up-art enthusiast/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-art enthusiast/st02/st02.component';
import { St1Component } from './pages/sign-up/sign-up-artist/st1/st1.component';
import { St2Component } from './pages/sign-up/sign-up-artist/st2/st2.component';
import { ResetPasswordComponent } from './pages/fogot-password/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/fogot-password/new-password/new-password.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
