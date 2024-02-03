import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { HighResArtworkComponent } from './shared/components/high-res-artwork/high-res-artwork.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './shared/components/comments/comment/comment.component';
import { CommentListComponent } from './shared/components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './shared/components/comments/comment-form/comment-form.component';
import { CommentsService } from './shared/services/comments.service';

@NgModule({
  declarations: [
    AppComponent,
    ArtworkPreviewComponent,
    HighResArtworkComponent,
    CommentComponent,
    CommentFormComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
