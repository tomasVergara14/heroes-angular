import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public publishers = [
    {
      id:'DC Comics',
      description: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      description: 'Marvel - Comics'
    }
  ]

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{ nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl<string>('',{ nonNullable: true }),
    first_appearance: new FormControl<string>('',{ nonNullable: true }),
    characters:       new FormControl<string>('',{ nonNullable: true }),
    alt_img:          new FormControl<string>(''),
  })

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {

    if(!this.router.url.includes('edit')) return;     //

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id })=> this.heroesService.getHeroById(id) )
      ).subscribe( hero =>{
          if(!hero) return this.router.navigate([ '/heroes/list' ])

          this.heroForm.reset( hero )

          return;
        }
      )
  }

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(){
    if(this.heroForm.invalid) return

    if(this.currentHero.id){
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero =>{
          //TODO mostrar snackbar
        } )
      
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero=>{
        //TODO mostrar snackbar
      })

  }

}
