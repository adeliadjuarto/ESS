import { Action } from '@ngrx/store';
import { UserAction } from './user.action';
import { User } from './user.model';

export interface UserState {
    user: User;
}

export const initialState: UserState = {
    user: null
};

export function reducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case UserAction.INIT:
      return initialState;

    case UserAction.CHANGE_USER:
      return Object.assign({}, state, {
          user: action.payload
      });

    default:
      return state;
  }

}
