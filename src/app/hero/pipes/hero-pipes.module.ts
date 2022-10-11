import { NgModule } from '@angular/core';
import { HeroListPipe } from './hero-list.pipe';
import { HeroPipe } from './hero.pipe';

const PUBLIC_DECLARATIONS = [
  HeroPipe,
  HeroListPipe,
];

@NgModule({
  declarations: PUBLIC_DECLARATIONS,
  exports: PUBLIC_DECLARATIONS,
})
export class HeroPipesModule {}
