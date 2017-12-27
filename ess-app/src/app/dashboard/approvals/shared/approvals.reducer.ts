import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { Approvals } from './approvals.model';

import { ApprovalsAction as Actions } from './approvals.action';

export interface ApprovalsState {
    approvalItems: Approvals[];
    error;
    loading: boolean;
    success: boolean;
}

export const initialState: ApprovalsState = {
    approvalItems: [],
    error: null,
    loading: false,
    success: false
};

export function reducer(state: ApprovalsState = initialState, action: Action) {
    switch (action.type) {
        case Actions.FETCH_APPROVALS_BEGIN:
            return Object.assign({}, state, {
                approvalItems: state.approvalItems,
                error: null,
                loading: true,
                success: false,
            });
        case Actions.FETCH_APPROVALS_SUCCESS:
            return Object.assign({}, state, {
                approvalItems: action.payload,
                error: null,
                loading: false,
                success: true,
            });
        case Actions.FETCH_APPROVALS_ERROR:
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
