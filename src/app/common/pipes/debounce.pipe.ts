import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'debounce'
})
export class DebouncePipe implements PipeTransform {
  prevValue: unknown;

  transform<T>(value: T, debounce: number): Observable<T> {
    return timer(debounce).pipe(
      map(() => value),
    );
  }
}
