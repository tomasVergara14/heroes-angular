import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  public searchControl = new FormControl('')
  public heroes: Hero[] = [];
  public selectedOption?: Hero;

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ){}

  searchHeroes(){
    const value: string = this.searchControl.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(
        heroes => this.heroes = heroes
      );

  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{

    if(!event.option.value){
      this.selectedOption = undefined
      return;
    }

    const hero: Hero = event.option.value

    this.searchControl.setValue(hero.superhero)

    this.selectedOption = hero;
    
    this.router.navigate([`heroes/id/`,hero.id])

  }

}
