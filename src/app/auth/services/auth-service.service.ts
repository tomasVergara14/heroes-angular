import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user';
import { Observable, tap, of, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User|undefined {
    if( !this.user ) return undefined

    return structuredClone(this.user);      // similar al spread operator crea una copia
  }

  login( email: string, pass: string ):Observable<User>{

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),                                     // Almacenamos el usuarios 
        tap( user => localStorage.setItem('token', user.id.toString() ) )      // Almacenamos el id en localStorage
      )
  }

  checkAuthentication():Observable<boolean>{

    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
     .pipe(
      tap( user => this.user = user ),
      map( user => !!user )                                            // Devolvemos un Observable boolano, con  el primer lo convertimos en booleano en su opuesto
     )
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }
  
}