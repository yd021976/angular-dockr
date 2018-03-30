import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';

// App components
import { HomeViewComponent } from '../views/home-view/home-view.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';

// App Routing types
import { appRoute } from './routing.types';
import { FeathersService } from '../services/feathers/feathers.service';
import { LoginComponent } from '../shared/user/components/login/login.component';



// Define the application routes
const routes: appRoute[] =
  [
    {
      path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
      path: '', data: { isMenu: true, title: 'Home', icon: 'home' }, children: [
        {
          path: 'home', component: HomeViewComponent, data: { isMenu: true, title: 'Home', icon: 'panorama_fish_eye', link: 'home' }
        },
        {
          path: 'dashboard', component: DashboardComponent, data: { isMenu: true, title: 'dashboard', icon: '', link: 'dashboard' }
        }]
    },
    {
      path: '', data: { isMenu: true, title: 'Settings', icon: 'build' }, children: [
        {
          path: 'settings', component: HomeViewComponent, data: { isMenu: true, title: 'General', icon: '', link: 'settings' }
        }
      ]
    }
  ]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: []
})
export class RoutingModule { }
