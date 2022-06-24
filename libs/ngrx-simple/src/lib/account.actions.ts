import {props} from '@ngrx/store';
import {SimpleActions} from "./action-factory";

export class AccountActions extends SimpleActions {
  scope = 'USERS';

  public static testAction = {
    do: this.doP("test action", props<{
      test: string
    }>()),
    success: this.success("test action"),
    fail: this.fail("test action")
  }
}
