import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerProfileComponent } from './pages/Customer/edit-customer-profile/edit-customer-profile.component';
import { CustomerProfileGalleryComponent } from './pages/Customer/customer-profile-gallery/customer-profile-gallery.component';
import { FollowingArtistsComponent } from './pages/Customer/following-artists/following-artists.component';
import { ArtistPortfolioComponent } from './pages/Customer/artist-portfolio/artist-portfolio.component';
import { FeedbackListCardComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component';
import { ArtsComponent } from './shared/components/cards/arts/arts.component';
import { SearchArtComponent } from './pages/Customer/search-art/search-art.component';
import { PurchaseImgCardComponent } from './pages/Customer/purchase-img-card/purchase-img-card.component';

const routes: Routes = [
  { path: 'customer-profile-gallery', component: CustomerProfileGalleryComponent },
  { path: 'edit-customer-profile', component: EditCustomerProfileComponent },
  { path: 'following-artists', component: FollowingArtistsComponent},
  { path: 'artist-portfolio', component: ArtistPortfolioComponent},
  { path: 'feedback-list-card',component: FeedbackListCardComponent},
  { path: 'arts',component: ArtsComponent},
  { path:'search-art',component: SearchArtComponent},
  { path:'purchase-img-card',component:PurchaseImgCardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
