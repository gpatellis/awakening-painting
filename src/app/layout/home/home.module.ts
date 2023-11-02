import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';
import { MessageOneComponent } from './message-one/message-one.component';
import { MessageThreeComponent } from './message-three/message-three.component';
import { MessageTwoComponent } from './message-two/message-two.component';
import { RouterModule, Routes } from '@angular/router';

const homeRoutes: Routes = [ {
  path: '',
  component: HomeComponent 
}];

@NgModule({
  declarations: [
    HomeComponent,
    HomeNavigationComponent,
    MessageOneComponent,
    MessageTwoComponent,
    MessageThreeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
