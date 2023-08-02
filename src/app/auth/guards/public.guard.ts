import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  checkLogStatus():boolean | Observable<boolean>{
    
    return this.authService.checkAuthentication()
      .pipe( 
        tap(isLogged =>{
          if(isLogged){
            this.router.navigate(['./'])
          }
        }),
        map( isLogged => !isLogged  )
      )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkLogStatus();
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkLogStatus();
  }
}
