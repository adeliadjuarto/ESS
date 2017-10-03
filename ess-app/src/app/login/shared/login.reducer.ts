/**
 * Created by glenn on 7/31/17.
 */

import { Action } from '@ngrx/store';
import { AuthenticationAction } from './login.action';

export interface LoginState {
  loading: boolean;
  success: boolean;
  message: any;
}

export const initialState: LoginState = {
  loading: false,
  success: false,
  message: null
};

export function reducer(state: LoginState = initialState, action: Action) {

  switch (action.type) {
    case AuthenticationAction.INIT:
      return initialState;

    case AuthenticationAction.LOGIN_BEGIN:
      return Object.assign({}, state, { loading: true, success: false, message: null });

    case AuthenticationAction.LOGIN_COMPLETE:
      return Object.assign({}, state, { loading: false, success: action.payload.success, message: action.payload.message });

    case AuthenticationAction.LOGOUT_BEGIN:
      return Object.assign({}, state, { loading: true, success: false, message: null });

    case AuthenticationAction.LOGOUT_COMPLETE:
      return Object.assign({}, state, { loading: false, success: true, message: action.payload.message });

    case AuthenticationAction.CHANGE_PASSWORD_BEGIN:
      return Object.assign({}, state, { loading: true, success: false, message: null });

    case AuthenticationAction.CHANGE_PASSWORD_COMPLETE:
      return Object.assign({}, state, { loading: false, success: action.payload.success, message: action.payload.message });

    default:
      return state;
  }

}
