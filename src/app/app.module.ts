import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { HighResArtworkComponent } from './shared/components/high-res-artwork/high-res-artwork.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './shared/components/comments/comment/comment.component';
import { CommentListComponent } from './shared/components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './shared/components/comments/comment-form/comment-form.component';
import { CommentsService } from './shared/services/comments.service';

import { NgChartsModule } from 'ng2-charts';

import { DefaultLayoutModule } from './pages/adminPanel/default-layout/default-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    ArtworkPreviewComponent,
    HighResArtworkComponent,
    CommentComponent,
    CommentFormComponent,
    CommentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
    DefaultLayoutModule
  ],
  providers: [
    provideClientHydration(),
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
