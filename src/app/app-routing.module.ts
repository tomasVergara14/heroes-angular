import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

//domain.com/
const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate:[ PublicGuard ]
  },
  {
    path:'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canActivate:[ AuthGuard ]
  },
  {
    path:'404',
    component: Error404PageComponent,               // Error doesnt use lazyload
  },
  {
    path:'',
    redirectTo:'heroes',
    pathMatch: 'full'                               // must be exact
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
