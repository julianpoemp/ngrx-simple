import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ButtonActions} from "./button.actions";

@Component({
  selector: 'ngrx-simple-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store) {
  }

  onButtonClick() {
    this.store.dispatch(ButtonActions.click.do({
      test: "ok"
    }));
  }
}
