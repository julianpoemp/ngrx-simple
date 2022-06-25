import {props} from '@ngrx/store';
import {noprops, SimpleActions} from "@ngrx-simple/ngrx-simple";

interface TestProps {
  test: string;
}

export class ButtonActions extends SimpleActions {
  static scope = "button";

  constructor() {
    super();
  }

  public static click = ((label: string, scope: string) => ({
    do: this.doP(scope, label, props<TestProps>()),
    success: this.successP(scope, label, props<TestProps>()),
    fail: this.fail(scope, label)
  }))("click", this.scope);

  public static test = SimpleActions.generate(this.scope, {
    label: "test",
    doProps: props<{
      hallo: string
    }>(),
    successProps: props<{
      hallo: string
    }>(),
    failProps: props<{
      hallo: string
    }>()
  });
}
