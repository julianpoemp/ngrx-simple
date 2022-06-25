import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ButtonActions} from "./button.actions";
import {RootState, State} from "./app.reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'ngrx-simple-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  $buttonClicks?: Observable<string>;

  constructor(private store: Store<RootState>) {
    this.$buttonClicks = this.store.select((state: { app: State }) => {
      return state.app.test;
    });
  }

  onButtonClick() {
    this.store.dispatch(ButtonActions.click.do({
      test: "ok"
    }));
  }
}
