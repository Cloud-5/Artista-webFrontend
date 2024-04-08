import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { HighResArtworkComponent } from './shared/components/high-res-artwork/high-res-artwork.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { St01Component } from './pages/sign-up/sign-up-art enthusiast/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-art enthusiast/st02/st02.component';
import { St1Component } from './pages/sign-up/sign-up-artist/st1/st1.component';
import { St2Component } from './pages/sign-up/sign-up-artist/st2/st2.component';
import { ResetPasswordComponent } from './pages/fogot-password/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/fogot-password/new-password/new-password.component';
import { CheckEmailComponent } from './pages/fogot-password/check-email/check-email.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { ArtistCardComponent } from './shared/cards/Trending-artists/artist-card/artist-card.component';
import { CardComponent } from './shared/cards/Trending-artworks/card/card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessageComponent } from './pages/message/message/message.component';
import { CommentComponent } from './shared/components/comments/comment/comment.component';
import { CommentListComponent } from './shared/components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './shared/components/comments/comment-form/comment-form.component';
import { CommentsService } from './shared/services/comments.service';

import { HighchartsChartModule } from 'highcharts-angular';

import { DefaultLayoutModule } from './pages/adminPanel/default-layout/default-layout.module';
import { ModelComponent } from './shared/components/model/model.component';

import { EditCustomerProfileComponent } from './pages/Customer/edit-customer-profile/edit-customer-profile.component';
import { CustomerProfileGalleryComponent } from './pages/Customer/customer-profile-gallery/customer-profile-gallery.component';
import { FollowingArtistsComponent } from './pages/Customer/following-artists/following-artists.component';
import { ArtistPortfolioComponent } from './pages/Customer/artist-portfolio/artist-portfolio.component';
import { FeedbackListComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component';
import { PurchaseImgCardComponent } from './pages/Customer/purchase-img-card/purchase-img-card.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ArtsComponent } from './shared/components/cards/arts/arts.component';
import { SearchArtComponent } from './pages/Customer/search-art/search-art.component';

import { ArtistPortfolioService } from './pages/Customer/artist-portfolio/artist-portfolio-service.service'

//import { FeedbackListCardComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component'; // Import the FeedbackListCardComponent class


@NgModule({
  declarations: [
    AppComponent,
    ArtworkPreviewComponent,
    HighResArtworkComponent,
    SignInComponent,
    St01Component,
    St02Component,
    St1Component,
    St2Component,
    ResetPasswordComponent,
    NewPasswordComponent,
    CheckEmailComponent,
    HomeComponent,
    HelpCenterComponent,
    ArtistCardComponent,
    CardComponent,
    MessageComponent,
    CommentComponent,
    CommentFormComponent,
    CommentListComponent,
    ModelComponent,
    EditCustomerProfileComponent,
    CustomerProfileGalleryComponent,
    FollowingArtistsComponent,
    ArtistPortfolioComponent,
    PurchaseImgCardComponent,
    NavbarComponent,
    FooterComponent,
    ArtsComponent,
    SearchArtComponent,
    FeedbackListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DefaultLayoutModule,
    HighchartsChartModule,
    FormsModule

  ],
  providers: [
    provideClientHydration(),
    CommentsService,
    HttpClientModule,
    ArtistPortfolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
