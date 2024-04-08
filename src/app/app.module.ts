import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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

import { SearchArtComponent } from './pages/Customer/search-art/search-art.component';

import { ArtistPortfolioService } from './pages/Customer/artist-portfolio/artist-portfolio-service.service'

//import { FeedbackListCardComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component'; // Import the FeedbackListCardComponent class

import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ArtistsComponent } from './shared/cards/artists/artists.component';
import { ArtsComponent } from './shared/cards/arts/arts.component';
import { CartCardComponent } from './shared/cards/cart-card/cart-card.component';
import { CategoryComponent } from './shared/cards/category/category.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { FirstForyouComponent } from './pages/first-foryou/first-foryou.component';
import { CartComponent } from './pages/cart/cart.component';
import { ForyouComponent } from './pages/foryou/foryou.component';
import { CheckoutFormComponent } from './pages/checkout-form/checkout-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';

import { ArtistFeedbackComponent } from './pages/artist/artist-profile/artist-feedback/artist-feedback.component';
import { EditArtistProfileComponent } from './pages/artist/artist-profile/edit-artist-profile/edit-artist-profile.component';
import { ArtistFollowersComponent } from './pages/artist/artist-profile/artist-followers/artist-followers.component';
import { ArtistNewHomeComponent } from './pages/artist/artist-profile/artist-new-home/artist-new-home.component';
import { TestComponent } from './test/test.component';
import { UploadArtworksComponent } from './pages/artist/artist-profile/upload-artworks/upload-artworks.component';
import { NotificationComponent } from './pages/artist/artist-profile/notification/notification.component';




@NgModule({
  declarations: [
    AppComponent,
    ArtworkPreviewComponent,
    ModelComponent,
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
    FeedbackListComponent,
    ArtistsComponent,
    ArtsComponent,
    CartCardComponent,
    CategoryComponent,
    ArtistComponent,
    CartComponent,
    FirstForyouComponent,
    ForyouComponent,
    CheckoutFormComponent,
    CategoriesComponent,
    HighResArtworkComponent,

    ArtistNewHomeComponent,
    ArtistFeedbackComponent,
    EditArtistProfileComponent,
    ArtistFollowersComponent,
    TestComponent,
    UploadArtworksComponent,
    NotificationComponent,

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
