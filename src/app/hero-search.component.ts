import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent {
  name: string;

  constructor(private readonly router: Router) {}

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
