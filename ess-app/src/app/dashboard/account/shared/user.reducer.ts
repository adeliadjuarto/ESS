import { Action } from '@ngrx/store';
import { UserAction } from './user.action';

export interface UserState {
    id: string
}

export const initialState: UserState = {
    id: ''
};

export function reducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case UserAction.INIT:
      return initialState;

    case UserAction.CHANGE_USER:
      return Object.assign({}, state, {
          id: action.payload
      });

    default:
      return state;
  }

}
