import { ActionReducer, Action, combineReducers } from '@ngrx/store';

export interface State {
    searchToggle: boolean;
    isSearching: boolean;
    searchQuery: string;
}

export const initialState: State = {
    searchToggle: false,
    isSearching: false,
    searchQuery: '',
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case 'UPDATE_SEARCHTOGGLE':
            return Object.assign({}, state, {
                searchToggle: action.payload,
                isSearching: state.isSearching,
                searchQuery: state.searchQuery,
            });
        case 'UPDATE_ISSEARCHING':
            return Object.assign({}, state, {
                searchToggle: state.searchToggle,
                isSearching: action.payload,
                searchQuery: state.searchQuery,
            });
        case 'UPDATE_QUERY':
            return Object.assign({}, state, {
                searchToggle: state.searchToggle,
                isSearching: state.isSearching,
                searchQuery: action.payload,
            });
        case 'UPDATE_DATA':
            return Object.assign({}, state, {
                searchToggle: state.searchToggle,
                isSearching: state.isSearching,
                searchQuery: state.searchQuery,
            });
        case 'UPDATE_STATE':
            return Object.assign({}, state, {
                searchToggle: action.payload.searchToggle,
                isSearching: action.payload.isSearching,
                searchQuery: action.payload.searchQuery,
            });
        case 'RESET_SEARCH':
            return initialState;
        default:
            return state;
    }
}
