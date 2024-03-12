import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCustomerProfileComponent } from './pages/Customer/edit-customer-profile/edit-customer-profile.component';
import { CustomerProfileGalleryComponent } from './pages/Customer/customer-profile-gallery/customer-profile-gallery.component';
import { FollowingArtistsComponent } from './pages/Customer/following-artists/following-artists.component';
import { ArtistPortfolioComponent } from './pages/Customer/artist-portfolio/artist-portfolio.component';
import { FeedbackListCardComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component';
import { PurchaseImgCardComponent } from './pages/Customer/purchase-img-card/purchase-img-card.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ArtsComponent } from './shared/components/cards/arts/arts.component';


@NgModule({
  declarations: [
    AppComponent,
    EditCustomerProfileComponent,
    CustomerProfileGalleryComponent,
    FollowingArtistsComponent,
    ArtistPortfolioComponent,
    FeedbackListCardComponent,
    PurchaseImgCardComponent,
    NavbarComponent,
    FooterComponent,
    ArtsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
