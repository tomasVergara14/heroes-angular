import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Imports
import { Observable } from 'rxjs';
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
    
}