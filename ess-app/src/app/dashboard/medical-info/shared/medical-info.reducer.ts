import { ActionReducer, Action, combineReducers } from '@ngrx/store';

import { Provider } from './provider.model';
import { MedicalInfoAction as Actions } from './medical-info.action';

export interface State {
    providers: Provider[];
    message: string;
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: State = {
    providers: [],
    message: null,
    loading: false,
    error: false,
    success: false
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case Actions.FETCH_PROVIDERS_LOADING:
            return Object.assign({}, state, {
                loading: true,
                success: false,
                error: false,
            });
        case Actions.FETCH_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {
                providers: action.payload,
                loading: false,
                success: true,
                error: false
            });
        case Actions.FETCH_PROVIDERS_ERROR:
            return Object.assign({}, state, {
                message: action.payload,
                loading: false,
                success: false,
                error: true
            });
        case Actions.RESET:
            return initialState;
        default:
            return state;
    }
}
