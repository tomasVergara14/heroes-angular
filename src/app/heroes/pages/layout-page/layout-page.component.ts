import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  public sidebarItems=[
    { label:'List', icon:'label', url:'./list' },
    { label:'Add', icon:'add', url:'./new-hero' },
    { label:'Search', icon:'search', url:'./search' },
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  get user():User|undefined {
    return this.authService.currentUser;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['auth/login'])
  }

}
