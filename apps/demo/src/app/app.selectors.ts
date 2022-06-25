import {State} from "./app.reducer";
import {createSelector} from "@ngrx/store";

export const selectUser = (state: State) => state.test;
