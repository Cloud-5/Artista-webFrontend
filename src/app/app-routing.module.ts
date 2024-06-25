import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkPreviewComponent } from './pages/artwork-preview/artwork-preview.component';
import { ModelComponent } from './shared/components/model/model.component';

const routes: Routes = [
  { path: 'preview/:artworkId', component: ArtworkPreviewComponent },
  { path: 'model', component: ModelComponent},
  { path: '', redirectTo: '/art-p', pathMatch: 'full' }, // Redirect to artwork-preview by default
  { path: '**', redirectTo: '/art-p' }, // Redirect to artwork-preview for any other unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
