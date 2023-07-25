import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  public title: string = '';

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ){}

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {

    if(!this.router.url.includes('edit')) return;     //

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id })=> this.heroesService.getHeroById(id) )
      ).subscribe( hero =>{
          if(!hero) return this.router.navigate([ '/heroes/list' ])

          this.heroForm.reset( hero );
          this.title = hero.superhero;

          return;
        }
      )
  }


  onSubmit(){
    if(this.heroForm.invalid) return

    if(this.currentHero.id){
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero =>{
          this.showSnackbar(`${hero.superhero} updated`)
        } )
      
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero=>{
        this.router.navigate(['/heroes/id/',hero.id])
        this.showSnackbar(`${hero.superhero} updated`)
      })

  }

  showSnackbar( message: string ):void{
    this.snackbar.open(message, 'done',{
      duration:2500,
    })
  }

}
