import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
//Interfaces
import { Hero, Publisher } from '../../interfaces/hero.interface';
//Services
import { HeroesService } from '../../services/heroes.service';
//Angular material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
//Components
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
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
    private dialog: MatDialog
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

  onConfirmoDelete(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter(( result: boolean ) => result ),                                     // true si da en 'ok', false clickea fuera o en 'cancel'
      switchMap( ()=> this.heroesService.deleteHero( this.currentHero.id ) ),     // Si da true le pegamos al otro subscribe
      filter( (wasDeleted: boolean) => wasDeleted )                               // Revisa si ya fue eliminado para no eliminarlo dos veces
    )
    .subscribe(result => {
      this.router.navigate(['/heroes/list'])
    });
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
