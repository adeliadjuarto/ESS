import { ActionReducer, Action, combineReducers } from '@ngrx/store';

import { Document } from './document.model';
import { DocumentsAction as Actions } from './hcm-info.action';

export interface State {
    documents: Document[];
    yearList: String[];
    selectedDocument: Document;
}

export const initialState: State = {
    documents: [],
    yearList: [],
    selectedDocument: null
};

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case Actions.UPDATE_DOCUMENTLIST:
            return Object.assign({}, state, {
                documents: action.payload,
                yearList: state.yearList,
                selectedDocument: state.selectedDocument
            });
        case Actions.UPDATE_YEARLIST:
            return Object.assign({}, state, {
                documents: state.documents,
                yearList: action.payload,
                selectedDocument: state.selectedDocument
            });
        case Actions.UPDATE_DOCUMENT:
            return Object.assign({}, state, {
                documents: state.documents,
                yearList: state.yearList,
                selectedDocument: action.payload
            });
        case Actions.RESET:
            return initialState;
        default:
            return state;
    }
};
