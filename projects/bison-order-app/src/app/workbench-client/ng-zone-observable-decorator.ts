import {Observable} from 'rxjs';
import {NgZone} from '@angular/core';
import {observeInside, subscribeInside} from '@scion/toolkit/operators';
import {ObservableDecorator} from '@scion/microfrontend-platform';

/**
 * Mirrors the source, but ensures subscription and emission {@link NgZone} to be identical.
 */
export class NgZoneObservableDecorator implements ObservableDecorator {

  constructor(private _zone: NgZone) {
  }

  public decorate$<T>(source$: Observable<T>): Observable<T> {
    return new Observable<T>(observer => {
      const insideAngular = NgZone.isInAngularZone();
      const subscription = source$
        .pipe(
          subscribeInside(fn => this._zone.runOutsideAngular(fn)),
          observeInside(fn => insideAngular ? this._zone.run(fn) : this._zone.runOutsideAngular(fn)),
        )
        .subscribe(observer);
      return () => subscription.unsubscribe();
    });
  }
}
