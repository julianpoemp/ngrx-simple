import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ButtonActions} from "./button.actions";
import {map} from "rxjs";


@Injectable()
export class AppEffects {
  buttonClick$ = createEffect(() => this.actions$.pipe(
      ofType(ButtonActions.click.do),
      map(({test}) => ButtonActions.click.success({test}))
    )
  )

  constructor(private actions$: Actions) {
  }
}
