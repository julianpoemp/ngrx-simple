import {ActionCreatorProps, createAction, NotAllowedCheck, props} from "@ngrx/store";
import {ActionCreator, TypedAction} from "@ngrx/store/src/models";

export interface SimpleActionErrorProps {
  error: string;
  context: unknown;
}

export const noprops = () => props<Record<string, void>>()

export interface ActionGroup<D extends object, S extends object, F extends object> {
  label: string;
  doProps?: ActionCreatorProps<D> & NotAllowedCheck<D>;
  successProps?: ActionCreatorProps<S> & NotAllowedCheck<S>;
  failProps?: ActionCreatorProps<F> & NotAllowedCheck<F>;
}

export interface SimpleAction<D extends object, S extends object, F extends object> {
  do(): ActionCreator<string, (props: (D & NotAllowedCheck<D>)) => (D & TypedAction<string>)>;
  do(): ActionCreator<string, () => TypedAction<string>>;

  success(): ActionCreator<string, (props: (S & NotAllowedCheck<S>)) => (S & TypedAction<string>)>;
  success(): ActionCreator<string, () => TypedAction<string>>;

  fail(): ActionCreator<string, (props: (F & NotAllowedCheck<F>)) => (F & TypedAction<string>)>

  fail(): ActionCreator<string, () => TypedAction<string>>;
}


export class SimpleActions {
  public static generate<D extends object, S extends object, F extends object>(scope: string, group: ActionGroup<D, S, F>) {
    const t = createAction(this.wrapLabel(scope, group.label, "fail"));
    return {
      do: group.doProps ? createAction(this.wrapLabel(scope, group.label, "do"), group.doProps) : createAction(this.wrapLabel(scope, group.label, "do")),
      success: group.successProps ? createAction(this.wrapLabel(scope, group.label, "success"), group.successProps) : createAction(this.wrapLabel(scope, group.label, "success")),
      fail: group.failProps ? createAction(this.wrapLabel(scope, group.label, "fail"), group.failProps) : createAction(this.wrapLabel(scope, group.label, "fail")),
    }
  }

  protected static create(scope: string, actionLabel: string, type: string): ActionCreator<string, () => TypedAction<string>> {
    return createAction<string>(this.wrapLabel(scope, actionLabel, type));
  }

  protected static createP<D extends object>(scope: string, actionLabel: string, type: string, actionProps: ActionCreatorProps<D> & NotAllowedCheck<D>): ActionCreator<string, (props: (D & NotAllowedCheck<D>)) => (D & TypedAction<string>)> {
    return createAction<string, D>(this.wrapLabel(scope, actionLabel, type), actionProps);
  }

  protected static fail(scope: string, label: string) {
    return this.createP(scope, label, 'failed', props<SimpleActionErrorProps>());
  }

  protected static successP<D extends object>(scope: string, label: string, actionProps: ActionCreatorProps<D> & NotAllowedCheck<D>) {
    return this.createP(scope, label, 'success', actionProps);
  }

  protected static success<D extends object>(scope: string, label: string) {
    return this.create(scope, label, 'success');
  }

  protected static doP<D extends object>(scope: string, label: string, actionProps: ActionCreatorProps<D> & NotAllowedCheck<D>) {
    return this.createP(scope, label, 'do', actionProps);
  }

  protected static do<D extends object>(scope: string, label: string) {
    return this.create(label, 'do', scope);
  }

  protected static wrapLabel(scope: string, label: string, type: string) {
    return `[${scope}${(label) ? '/' + label : ''}]${(type) ? ' ' + type : ''}`
  }
}
