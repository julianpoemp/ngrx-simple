import {ActionCreatorProps, createAction, NotAllowedCheck, props} from "@ngrx/store";
import {ActionCreator, TypedAction} from "@ngrx/store/src/models";

export interface SimpleActionErrorProps {
  error: string;
  context: unknown;
}

export class SimpleActions {
  protected static scope: string

  protected static create(actionLabel: string, type: string): ActionCreator<string, () => TypedAction<string>> {
    return createAction<string>(this.wrapLabel(actionLabel, type));
  }

  protected static createP<D extends object>(actionLabel: string, type: string, actionProps: ActionCreatorProps<D> & NotAllowedCheck<D>): ActionCreator<string, (props: (D & NotAllowedCheck<D>)) => (D & TypedAction<string>)> {
    return createAction<string, D>(this.wrapLabel(actionLabel, type), actionProps);
  }

  protected static fail(label: string) {
    return this.createP(label, 'failed', props<SimpleActionErrorProps>());
  }

  protected static successP<D extends object>(label: string, t: ActionCreatorProps<D> & NotAllowedCheck<D>) {
    return this.createP(label, 'success', t);
  }

  protected static success<D extends object>(label: string) {
    return this.create(label, 'success');
  }

  protected static doP<D extends object>(label: string, t: ActionCreatorProps<D> & NotAllowedCheck<D>) {
    return this.createP(label, 'do', t);
  }

  protected static do<D extends object>(label: string) {
    return this.create(label, 'do');
  }

  protected static wrapLabel(label: string, type: string) {
    return `[${this.scope}/${type.toUpperCase()}] ${label}`
  }
}
