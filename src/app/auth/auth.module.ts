import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modules
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
//Components
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MaterialModule,
  ]
})
export class AuthModule { }
