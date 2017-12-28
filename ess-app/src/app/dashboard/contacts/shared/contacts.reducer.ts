import { ActionReducer, Action, combineReducers } from '@ngrx/store';

import { Contact } from './contact.model';
import { ContactsAction as Actions } from './contacts.action';

export interface State {
    employeeData: Contact[];
    loading: boolean;
    success: boolean;
    error: string;
}

export const initialState: State = {
    employeeData: [],
    loading: false,
    success: false,
    error: null
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case Actions.FETCH_CONTACTS_BEGIN:
            return Object.assign({}, state, {
                employeeData: state.employeeData,
                error: null,
                loading: true,
                success: false
            });
        case Actions.FETCH_CONTACTS_SUCCESS:
            return Object.assign({}, state, {
                employeeData: action.payload,
                error: null,
                loading: false,
                success: true
            });
        case Actions.FETCH_CONTACTS_ERROR:
            return Object.assign({}, state, {
                employeeData: state.employeeData,
                error: action.payload,
                loading: false,
                success: false
            });
        case Actions.RESET:
            return initialState;
        default:
            return state;
    }
};
