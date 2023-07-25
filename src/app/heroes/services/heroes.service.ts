import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Imports
import { Observable, catchError, of, map } from 'rxjs';
import { environments } from 'src/environments/environments';
//Interfaces
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl: string = environments.baseUrl;
    
    constructor(private httpClient: HttpClient) { }

    getHeores():Observable<Hero[]>{
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
    }

    getHeroById( id: string): Observable<Hero|undefined> {

        return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(err=> of(undefined))                                     // must be an observable
        )

    }

    getSuggestions( query: string ):Observable<Hero[]>{
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}`);
    }

    addHero( hero: Hero): Observable<Hero>{
        return this.httpClient.post<Hero>(`${this.baseUrl}/heroes/`, hero);
    }

    updateHero( hero: Hero):Observable<Hero>{
        if(!hero.id) throw Error('Hero id is required')
        return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    deleteHero( id: string):Observable<boolean>{
        return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                map(resp => true),
                catchError( err => of(false)),
            );
    }

    
}