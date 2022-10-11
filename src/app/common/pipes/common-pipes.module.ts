import { NgModule } from '@angular/core';
import { ActivatedRouteParamPipe } from './activated-route-param.pipe';
import { DebouncePipe } from './debounce.pipe';

const PUBLIC_DECLARATIONS = [
  ActivatedRouteParamPipe,
  DebouncePipe,
];

@NgModule({
  declarations: PUBLIC_DECLARATIONS,
  exports: PUBLIC_DECLARATIONS,
})
export class AppCommonPipesModule {}
