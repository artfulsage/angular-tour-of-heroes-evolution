import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

const NOT_SET_PREVIOUS_VALUE = Symbol('NOT_SET_PREVIOUS_VALUE');
const NOT_SET_NEXT_VALUE = Symbol('NOT_SET_NEXT_VALUE');

@Pipe({
  name: 'debounce',
  pure: false,
})
export class DebouncePipe implements PipeTransform {
  private previousValue: any = NOT_SET_PREVIOUS_VALUE;
  private nextValue: any = NOT_SET_NEXT_VALUE;
  private debounceTimer: any;

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
      clearTimeout(this.debounceTimer);
      return currentValue;
    }

    if (this.nextValue !== currentValue) {
      this.nextValue = currentValue;

      clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        this.zone.run(() => {
          this.debounceTimer = undefined;
          this.previousValue = currentValue;
          this.nextValue = NOT_SET_NEXT_VALUE;
          this.changeDetector.markForCheck();
        });
      }, debounceTime);
    }

    return this.previousValue;
  }
}
