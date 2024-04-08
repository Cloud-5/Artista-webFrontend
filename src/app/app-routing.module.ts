import { ArtistNewHomeComponent } from './pages/Artist/artist-profile/artist-new-home/artist-new-home.component';
import { ArtistFeedbackComponent } from './pages/Artist/artist-profile/artist-feedback/artist-feedback.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditArtistProfileComponent } from './pages/Artist/artist-profile/edit-artist-profile/edit-artist-profile.component';
import { ArtistFollowersComponent } from './pages/Artist/artist-profile/artist-followers/artist-followers.component';
import { ArtsComponent } from './shared/components/arts/arts.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: ArtistNewHomeComponent },
  {
    path: 'edit-artist-profile-component',
    component: EditArtistProfileComponent,
  },
  { path: 'artist-feedback', component: ArtistFeedbackComponent },
  { path: 'artist-followers', component: ArtistFollowersComponent },
  { path: 'arts', component: ArtsComponent },
  { path: 'test', component: TestComponent },

  // { path: 'edit-customer-profile', component: EditCustomerProfileComponent },
  //   { path: 'following-artists', component: FollowingArtistsComponent},
  //   { path: 'artist-portfolio', component: ArtistPortfolioComponent},
  //   { path: 'feedback-list-card',component: FeedbackListCardComponent},
  //   { path: 'arts',component: ArtsComponent},
  //   { path:'purchase-img-card',component:PurchaseImgCardComponent},
  //   { path: '', component: CustomerProfileGalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
