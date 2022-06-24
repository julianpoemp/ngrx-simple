import {props} from '@ngrx/store';
import {SimpleActions} from "@ngrx-simple/ngrx-simple";

export class TestActions extends SimpleActions {
  scope = 'TEST';

  public static testAction = ((label: string) => ({
    do: this.doP(label, props<{
      test: string
    }>()),
    success: this.success(label),
    fail: this.fail(label)
  }))("test action");
}
