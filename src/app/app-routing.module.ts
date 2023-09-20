import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paintingCheckoutGuard } from './layout/painting-checkout/painting-checkout.guard';
import { ContactComponent } from './layout/contact/contact.component';

const routes: Routes = [
  { 
    path: 'gallery',
    loadChildren: () => import('./layout/gallery/gallery.module').then(m => m.GalleryModule) 
  },
  { 
    path: 'checkout',
    loadChildren: () => import('./layout/painting-checkout/painting-checkout.module').then(m => m.PaintingCheckoutModule),
    canActivate: [paintingCheckoutGuard]
  },
  { path: 'contact', component: ContactComponent},
  { path: '', pathMatch: 'full', redirectTo: 'gallery' },
  { path: '**', redirectTo: 'gallery' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
