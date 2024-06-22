import { ArtistNewHomeComponent } from './pages/Artist/artist-profile/artist-new-home/artist-new-home.component';
import { ArtistFeedbackComponent } from './pages/Artist/artist-profile/artist-feedback/artist-feedback.component';
import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditArtistProfileComponent } from './pages/Artist/artist-profile/edit-artist-profile/edit-artist-profile.component';
import { ArtistFollowersComponent } from './pages/Artist/artist-profile/artist-followers/artist-followers.component';
import { ArtsComponent } from './shared/components/arts/arts.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TestComponent } from './test/test.component';
import { UploadArtworksComponent } from './pages/Artist/artist-profile/upload-artworks/upload-artworks.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { HelpCenterComponent } from './shared/components/help-center/help-center.component';

const routes: Routes = [
  { path: '', component: ArtistNewHomeComponent },
  {path: 'edit',component:EditArtistProfileComponent},
  { path: 'artist-feedback', component: ArtistFeedbackComponent },
  { path: 'artist-followers', component: ArtistFollowersComponent },
  { path: 'arts', component: ArtsComponent },
  {path:'upload',component:UploadArtworksComponent},
  {path:'notification',component:NotificationComponent},
  {path:'help',component:HelpCenterComponent}


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
