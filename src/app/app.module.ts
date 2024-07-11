import { NgModule, inject } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';


import { EditCustomerProfileComponent } from './pages/Customer/edit-customer-profile/edit-customer-profile.component';
import { CustomerProfileGalleryComponent } from './pages/Customer/customer-profile-gallery/customer-profile-gallery.component';
import { FollowingArtistsComponent } from './pages/Customer/following-artists/following-artists.component';
import { ArtistPortfolioComponent } from './pages/Customer/artist-portfolio/artist-portfolio.component';
import { FeedbackListComponent } from './pages/Customer/feedback-list-card/feedback-list-card.component';
import { PurchaseImgCardComponent } from './pages/Customer/purchase-img-card/purchase-img-card.component';

import { FooterComponent } from './shared/components/footer/footer.component';

import { SearchArtComponent } from './pages/Customer/search-art/search-art.component';

import { ArtistPortfolioService } from './pages/Customer/artist-portfolio/artist-portfolio-service.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './shared/components/comments/comment/comment.component';
import { CommentListComponent } from './shared/components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './shared/components/comments/comment-form/comment-form.component';
import { CommentsService } from './shared/services/comments.service';

import { ModelComponent } from './shared/components/model/model.component';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { ArtistFeedbackComponent } from './pages/Artist/artist-profile/artist-feedback/artist-feedback.component';
import { EditArtistProfileComponent } from './pages/Artist/artist-profile/edit-artist-profile/edit-artist-profile.component';
import { ArtistFollowersComponent } from './pages/Artist/artist-profile/artist-followers/artist-followers.component';
import { ArtistNewHomeComponent } from './pages/Artist/artist-profile/artist-new-home/artist-new-home.component';

import { UploadArtworksComponent } from './pages/Artist/artist-profile/upload-artworks/upload-artworks.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { HelpCenterComponent } from './shared/components/help-center/help-center.component';
import { ArtistCreationsComponent } from './pages/Artist/artist-profile/artist-creations/artist-creations.component';


import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ArtistsComponent } from './shared/cards/artists/artists.component';
import { ArtsComponent } from './shared/cards/arts/arts.component';
import { CartCardComponent } from './shared/cards/cart-card/cart-card.component';
import { CategoryComponent } from './shared/cards/category/category.component';
import { ArtistComponent } from './pages/Artist/artist.component';
import { FirstForyouComponent } from './pages/first-foryou/first-foryou.component';
import { CartComponent } from './pages/cart/cart.component';
import { ForyouComponent } from './pages/foryou/foryou.component';
import { CheckoutFormComponent } from './pages/checkout-form/checkout-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { St01Component } from './pages/sign-up/sign-up-users/st01/st01.component';
import { St02Component } from './pages/sign-up/sign-up-users/st02/st02.component';
import { ResetPasswordComponent } from './pages/fogot-password/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/fogot-password/new-password/new-password.component';
import { HomeComponent } from './pages/home/home.component';

import { ArtistCardComponent } from './shared/cards/Trending-artists/artist-card/artist-card.component';
import { CardComponent } from './shared/cards/Trending-artworks/card/card.component';

import { FormsModule } from '@angular/forms';

import { ChatScreenComponent } from './pages/chat/chat-screen/chat-screen.component';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HTTP_INTERCEPTORS, HttpClientModule,provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { ArtCardComponent } from './pages/Customer/art-card/art-card.component';
import { CreationsComponent } from './pages/Artist/artist-profile/creations/creations.component';
import { CreationPreviewComponent } from './pages/Artist/artist-profile/creation-preview/creation-preview.component';
import { St03Component } from './pages/sign-up/sign-up-users/st03/st03.component';


@NgModule({
  declarations: [
    AppComponent,
    EditCustomerProfileComponent,
    CustomerProfileGalleryComponent,
    FollowingArtistsComponent,
    ArtistPortfolioComponent,
    PurchaseImgCardComponent,
    SearchArtComponent,
    FeedbackListComponent,
    FooterComponent,
    NavbarComponent,
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
    SignInComponent,
    St01Component,
    St02Component,
    ResetPasswordComponent,
    NewPasswordComponent,
    HomeComponent,
    HelpCenterComponent,
    ArtistCardComponent,
    CardComponent,
    ChatScreenComponent,
    ArtworkPreviewComponent,
    CommentComponent,
    CommentFormComponent,
    CommentListComponent,
    ModelComponent,
    ArtistFeedbackComponent,
    EditArtistProfileComponent,
    ArtistFollowersComponent,
    FooterComponent,
    NavbarComponent,
    ArtsComponent,
    ArtistNewHomeComponent,
    NotificationComponent,
    HelpCenterComponent,
    ArtCardComponent,
    ArtistCreationsComponent,
    UploadArtworksComponent,
    CreationsComponent,
    CreationPreviewComponent,
    St03Component


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatAutocompleteModule,

  ],

  providers: [
    provideClientHydration(),
    ArtistPortfolioService,
    CommentsService,
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-chat-c21c3',
        appId: '1:455184474056:web:cfa6398676083f316f6afd',
        storageBucket: 'angular-chat-c21c3.appspot.com',
        apiKey: 'AIzaSyDY2HU0m1AOkAbrydWIocDS9TRlD7lH93s',
        authDomain: 'angular-chat-c21c3.firebaseapp.com',
        messagingSenderId: '455184474056',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
