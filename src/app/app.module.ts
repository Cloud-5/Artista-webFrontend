import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { HighResArtworkComponent } from './shared/components/high-res-artwork/high-res-artwork.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
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
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
