import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstForyouComponent } from './pages/first-foryou/first-foryou.component';
import { CartComponent } from './pages/cart/cart.component';
import { ForyouComponent } from './pages/foryou/foryou.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { CheckoutFormComponent } from './pages/checkout-form/checkout-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  { path: '', component: FirstForyouComponent },
  { path: 'cart', component: CartComponent },
  { path: 'foryou', component: ForyouComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'checkout', component: CheckoutFormComponent},
  { path: 'categories', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
