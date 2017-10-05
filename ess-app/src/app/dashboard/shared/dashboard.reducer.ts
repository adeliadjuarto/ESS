import { Action } from '@ngrx/store';
import { DashboardAction } from './dashboard.action';

export interface DashboardState {
    title: string
}

export const initialState: DashboardState = {
    title: ''
};

export function reducer(state: DashboardState = initialState, action: Action) {
  switch (action.type) {
    case DashboardAction.INIT:
      return initialState;

    case DashboardAction.CHANGE_TITLE:
      return Object.assign({}, state, {
          title: action.payload
      });

    default:
      return state;

  }

}
