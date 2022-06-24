import {ActionCreatorProps, createAction, NotAllowedCheck, props} from "@ngrx/store";
import {ActionCreator, TypedAction} from "@ngrx/store/src/models";

export interface SimpleActionErrorProps {
  error: string;
  context: unknown;
}

export class SimpleActions {
  protected scope = "";

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
