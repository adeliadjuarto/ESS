import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { environment } from '../environments/environment';

import * as fromLogin from './login/shared/login.reducer';

export interface AppState {
    loginState: fromLogin.LoginState;
}

const reducers = {
    loginState: fromLogin.reducer,
};

export const prodReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return prodReducer(state, action);
}