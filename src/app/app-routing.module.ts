import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerProfileComponent } from './pages/Customer/edit-customer-profile/edit-customer-profile.component';
import { CustomerProfileGalleryComponent } from './pages/Customer/customer-profile-gallery/customer-profile-gallery.component';
import { FollowingArtistsComponent } from './pages/Customer/following-artists/following-artists.component';
import { ArtistPortfolioComponent } from './pages/Customer/artist-portfolio/artist-portfolio.component';
import { FeedbackListCardComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component';
import { ArtCardComponent } from './pages/Customer/art-card/art-card.component';

const routes: Routes = [
  { path: 'customer-profile-gallery', component: CustomerProfileGalleryComponent },
  { path: 'edit-customer-profile', component: EditCustomerProfileComponent },
  { path: 'following-artists', component: FollowingArtistsComponent},
  { path: 'artist-portfolio', component: ArtistPortfolioComponent},
  { path: 'feedback-list-card',component: FeedbackListCardComponent},
  { path: 'art-card',component:ArtCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
