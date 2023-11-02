import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paintingCheckoutGuard } from './layout/painting-checkout/painting-checkout.guard';
import { ContactComponent } from './layout/contact/contact.component';

const routes: Routes = [
  { 
    path: 'home',
    loadChildren: () => import('./layout/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: 'gallery',
    loadChildren: () => import('./layout/gallery/gallery.module').then(m => m.GalleryModule) 
  },
  { 
    path: 'checkout',
    loadChildren: () => import('./layout/painting-checkout/painting-checkout.module').then(m => m.PaintingCheckoutModule),
    canActivate: [paintingCheckoutGuard]
  },
  { 
    path: 'contact', 
    loadChildren: () => import('./layout/contact/contact.module').then(m => m.ContactModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
