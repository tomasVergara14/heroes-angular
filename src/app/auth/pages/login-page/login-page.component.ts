import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  onLogin(){
    this.authService.login('tomas@postcron.com','123456')
      .subscribe( user =>{
        this.router.navigate(['/'])
      })
  }
}
