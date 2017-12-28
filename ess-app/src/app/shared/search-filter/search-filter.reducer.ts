import { Action } from '@ngrx/store';

import { SearchFilterActions as Actions } from './search-filter.action';

export type State = any;
export const initialState = {};

export function reducer(state = initialState, action: Action) {
    let newState = {};

    switch (action.type) {
        case Actions.FILTER_INIT:
            newState[action.payload.component] = {};
            return Object.assign({}, state, newState);

        case Actions.FILTER_UPDATE:
            let { component, filters } = action.payload;
            newState[component] = filters;
            return Object.assign({}, state, newState);

        case Actions.RESET:
            return initialState;

        default:
            return state;
    }

}
