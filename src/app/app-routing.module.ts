import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './layout/about/about.component';

const routes: Routes = [
  { 
    path: 'gallery',
    loadChildren: () => import('./layout/gallery/gallery.module').then(m => m.GalleryModule) 
  },
  { 
    path: 'checkout',
    loadChildren: () => import('./layout/painting-checkout/painting-checkout.module').then(m => m.PaintingCheckoutModule) 
  },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'gallery' },
  { path: '**', redirectTo: 'gallery' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
