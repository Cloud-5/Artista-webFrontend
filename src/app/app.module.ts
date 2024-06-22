import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ArtistFeedbackComponent } from './pages/Artist/artist-profile/artist-feedback/artist-feedback.component';
import { EditArtistProfileComponent } from './pages/Artist/artist-profile/edit-artist-profile/edit-artist-profile.component';
import { ArtistFollowersComponent } from './pages/Artist/artist-profile/artist-followers/artist-followers.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ArtsComponent } from './shared/components/arts/arts.component';
import { ArtistNewHomeComponent } from './pages/Artist/artist-profile/artist-new-home/artist-new-home.component';
import { TestComponent } from './test/test.component';
import { UploadArtworksComponent } from './pages/Artist/artist-profile/upload-artworks/upload-artworks.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { HelpCenterComponent } from './shared/components/help-center/help-center.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtworkPreviewComponent,
    ArtistFeedbackComponent,
    EditArtistProfileComponent,
    ArtistFollowersComponent,
    FooterComponent,
    NavbarComponent,
    ArtsComponent,
    ArtistNewHomeComponent,
    TestComponent,
    UploadArtworksComponent,
    NotificationComponent,
    HelpCenterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
