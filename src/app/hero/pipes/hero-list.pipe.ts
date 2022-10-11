import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from 'app/hero';
import { HeroSearchService } from 'app/hero-search.service';
import { HeroService } from 'app/hero.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'heroes',
})
export class HeroListPipe implements PipeTransform {
  constructor(
    private readonly heroService: HeroService,
    private readonly heroSearchService: HeroSearchService,
  ) {}

  transform(filter: { name?: string } | null): Observable<Hero[]> | null {
    if (filter == null) {
      return null;
    }

    if ('name' in filter) {
      if (filter.name) {
        return this.heroSearchService.search(filter.name);
      }

      return of([]);
    }

    return this.heroService.getHeroes();
  }
}
