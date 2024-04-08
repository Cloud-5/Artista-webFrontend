
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
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { DefaultLayoutComponent } from './pages/adminPanel/default-layout/default-layout.component';
import { DashboardComponent } from './pages/adminPanel/modules/dashboard/dashboard.component';
import { ArtCategoriesComponent } from './pages/adminPanel/modules/art-categories/art-categories.component';
import { UserManagementComponent } from './pages/adminPanel/modules/user-management/user-management.component';
import { ArtistRequestsComponent } from './pages/adminPanel/modules/artist-requests/artist-requests.component';
import { ModelComponent } from './shared/components/model/model.component';

import { EditCustomerProfileComponent } from './pages/Customer/edit-customer-profile/edit-customer-profile.component';
import { CustomerProfileGalleryComponent } from './pages/Customer/customer-profile-gallery/customer-profile-gallery.component';
import { FollowingArtistsComponent } from './pages/Customer/following-artists/following-artists.component';
import { ArtistPortfolioComponent } from './pages/Customer/artist-portfolio/artist-portfolio.component';
import { FeedbackListComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component';
import { ArtsComponent } from './shared/components/cards/arts/arts.component';
import { SearchArtComponent } from './pages/Customer/search-art/search-art.component';
import { PurchaseImgCardComponent } from './pages/Customer/purchase-img-card/purchase-img-card.component';

import { FirstForyouComponent } from './pages/first-foryou/first-foryou.component';
import { CartComponent } from './pages/cart/cart.component';
import { ForyouComponent } from './pages/foryou/foryou.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { CheckoutFormComponent } from './pages/checkout-form/checkout-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditArtistProfileComponent } from './pages/artist/artist-profile/edit-artist-profile/edit-artist-profile.component';
import { TestComponent } from './test/test.component';

import { ArtistNewHomeComponent } from './pages/artist/artist-profile/artist-new-home/artist-new-home.component';
import { ArtistFeedbackComponent } from './pages/artist/artist-profile/artist-feedback/artist-feedback.component';

import { ArtistFollowersComponent } from './pages/artist/artist-profile/artist-followers/artist-followers.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'st1', component: St1Component },
  { path: 'st01', component: St01Component },
  { path: 'st2', component: St2Component },
  { path: 'st02', component: St02Component },
  { path: 'helpCenter', component: HelpCenterComponent },

  { path: 'reset', component: ResetPasswordComponent },
  { path: 'new', component: NewPasswordComponent },

  { path: 'message', component: MessageComponent },

  { path: 'art-p', component: ArtworkPreviewComponent },
  { path: 'model', component: ModelComponent },

  {
    path: 'admin', component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'art-categories', component: ArtCategoriesComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'artist-requests', component: ArtistRequestsComponent },
    ],
  },


  { path: 'customer-profile-gallery', component: CustomerProfileGalleryComponent },
  { path: 'edit-customer-profile', component: EditCustomerProfileComponent },
  { path: 'following-artists', component: FollowingArtistsComponent },
  { path: 'artist-portfolio', component: ArtistPortfolioComponent },
  { path: 'feedback-list-card', component: FeedbackListComponent },
  { path: 'arts', component: ArtsComponent },
  { path: 'search-art', component: SearchArtComponent },
  { path: 'purchase-img-card', component: PurchaseImgCardComponent },

  { path: 'home', component: FirstForyouComponent },
  { path: 'cart', component: CartComponent },
  { path: 'foryou', component: ForyouComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'categories', component: CategoriesComponent },

  { path: 'newHome', component: ArtistNewHomeComponent },
  { path: 'edit-artist-profile-component', component: EditArtistProfileComponent, },
  { path: 'artist-feedback', component: ArtistFeedbackComponent },
  { path: 'artist-followers', component: ArtistFollowersComponent },
  { path: 'arts', component: ArtsComponent },
  { path: 'test', component: TestComponent },


  { path: '', redirectTo: '/art-p', pathMatch: 'full' }, // Redirect to artwork-preview by default
  { path: '**', redirectTo: '/art-p' }, // Redirect to artwork-preview for any other unknown routes

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
