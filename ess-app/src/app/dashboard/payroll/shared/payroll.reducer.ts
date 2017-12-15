import { Action } from '@ngrx/store';

import { PayrollAction } from './payroll.action';
import { Payroll } from './payroll.model';

export interface PayrollState {
    latestPayroll: Payroll;
    currentPayroll: Payroll;
}

export const initialState: PayrollState = {
    latestPayroll: {
        id: '',
        monthName: '',
        payrollFile: null,
        payrollStatus: ''
    },
    currentPayroll: {
        id: '',
        monthName: '',
        payrollFile: null,
        payrollStatus: ''
    }
};

export function reducer(state: PayrollState = initialState, action: Action) {
  switch (action.type) {
    case(PayrollAction.FETCH_LATEST_PAYROLL_SUCCESS):
        return Object.assign({}, state, {
            latestPayroll: action.payload,
            currentPayroll: state.currentPayroll
        });
    case(PayrollAction.FETCH_PAYROLL_SUCCESS):
        return Object.assign({}, state, {
            latestPayroll: state.latestPayroll,
            currentPayroll: action.payload
        })
    default:
        return state;
  }

}
