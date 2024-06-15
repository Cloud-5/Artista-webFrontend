import { NgModule, inject } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { ChatScreenComponent } from './pages/chat/chat-screen/chat-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ArtworkPreviewComponent,
    HighResArtworkComponent,
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
    CategoriesComponent

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
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
    ChatScreenComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule

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
    provideFirebaseApp(() => initializeApp({"projectId":"angular-chat-c21c3","appId":"1:455184474056:web:cfa6398676083f316f6afd","storageBucket":"angular-chat-c21c3.appspot.com","apiKey":"AIzaSyDY2HU0m1AOkAbrydWIocDS9TRlD7lH93s","authDomain":"angular-chat-c21c3.firebaseapp.com","messagingSenderId":"455184474056"})),
    provideFirestore(() => getFirestore()),  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
