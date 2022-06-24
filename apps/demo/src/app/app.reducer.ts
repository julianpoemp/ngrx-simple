import { Action, createReducer, on } from '@ngrx/store';
import {ButtonActions} from "./button.actions";


export const appFeatureKey = 'app';

export interface State {
  test: string;
}

export const initialState: State = {
  test: ""
};

export const appReducer = createReducer(
  initialState,
  on(ButtonActions.click.success, (state, {test})=>({
    ...state,
    test
  }))
);
