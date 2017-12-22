import { Action } from '@ngrx/store';

import { PayrollAction } from './payroll.action';
import { Payroll } from './payroll.model';

export interface PayrollState {
    processedPayrolls: Payroll[];
    currentPayroll: Payroll;
}

export const initialState: PayrollState = {
    processedPayrolls: [],
    currentPayroll: {
        id: '',
        monthName: '',
        payrollFile: null,
        payrollStatus: ''
    }
};

export function reducer(state: PayrollState = initialState, action: Action) {
  switch (action.type) {
    case(PayrollAction.FETCH_PROCESSED_PAYROLLS_SUCCESS):
        return Object.assign({}, state, {
            processedPayrolls: action.payload,
            currentPayroll: state.currentPayroll
        });
    case(PayrollAction.FETCH_PAYROLL_SUCCESS):
        return Object.assign({}, state, {
            processedPayrolls: state.processedPayrolls,
            currentPayroll: action.payload
        })
    default:
        return state;
  }

}
