import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { Status } from './status.model';

import { StatusAction as Actions } from './status.action';

export interface StatusState {
    approvalItems: Status[];
    error;
    loading: boolean;
    success: boolean;
}

export const initialState: StatusState = {
    approvalItems: [],
    error: null,
    loading: false,
    success: false
};

export function reducer(state: StatusState = initialState, action: Action) {
    switch (action.type) {
        case Actions.FETCH_STATUS_BEGIN:
            return Object.assign({}, state, { 
                approvalItems: state.approvalItems,
                error: null,
                loading: true,
                success: false,
            });
        case Actions.FETCH_STATUS_SUCCESS:
            return Object.assign({}, state, {
                approvalItems: action.payload,
                error: null,
                loading: false,
                success: true,
            });
        case Actions.FETCH_STATUS_ERROR:
            return Object.assign({}, state, {
                approvalItems: state.approvalItems,
                error: action.payload,
                loading: false,
                success: false,
            });
        case Actions.RESET:
            return initialState;
        default:
            return state;
    }
};
