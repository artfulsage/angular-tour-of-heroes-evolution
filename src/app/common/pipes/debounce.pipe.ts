import { ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const NOT_SET_PREVIOUS_VALUE = Symbol('NOT_SET_PREVIOUS_VALUE');
const NOT_SET_NEXT_VALUE = Symbol('NOT_SET_NEXT_VALUE');

@Pipe({
  name: 'debounce',
  pure: false,
})
export class DebouncePipe implements PipeTransform, OnDestroy {
  private readonly destroySubject = new Subject<void>();

  private previousValue: any = NOT_SET_PREVIOUS_VALUE;
  private nextValue: any = NOT_SET_NEXT_VALUE;
  private debouncing = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private readonly zone: NgZone,
  ) {}

  transform<T>(currentValue: T, debounceTime: number): T {
    if (this.previousValue === NOT_SET_PREVIOUS_VALUE) {
      this.previousValue = currentValue;
      return currentValue;
    }

    if (this.previousValue === currentValue) {
      return currentValue;
    }

    if (this.nextValue !== currentValue) {
      this.nextValue = currentValue;

      if (!this.debouncing) {
        this.debouncing = true;

        timer(debounceTime)
          .pipe(
            tap(() => {
              this.zone.run(() => {
                this.previousValue = this.nextValue;
                this.nextValue = NOT_SET_NEXT_VALUE;
                this.debouncing = false;
                this.changeDetector.markForCheck();
              });
            }),
            takeUntil(this.destroySubject),
          )
          .subscribe();
      }
    }

    return this.previousValue;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
