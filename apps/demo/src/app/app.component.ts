import {Component} from '@angular/core';
import {AccountActions} from "../../../../libs/ngrx-simple/src/lib/account.actions";

export interface TestInterface {
  ok: string;
}

@Component({
  selector: 'ngrx-simple-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demo';

  constructor() {
  }
}
