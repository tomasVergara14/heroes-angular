import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroesImage'
})
export class HeroesImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if(!hero.id && !hero.alt_img){
      return 'assets/no-image.png'
    }
    return `${hero.alt_img}`;
  }

}
