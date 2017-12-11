import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { environment } from '../environments/environment';

import * as fromLogin from './login/shared/login.reducer';
import * as fromDashboard from './dashboard/shared/dashboard.reducer';
import * as fromPayroll from './dashboard/payroll/shared/payroll.reducer';

export interface AppState {
    loginState: fromLogin.LoginState;
    dashboardState: fromDashboard.DashboardState;
    payrollState: fromPayroll.PayrollState;
}

const reducers = {
    loginState: fromLogin.reducer,
    dashboardState: fromDashboard.reducer,
    payrollState: fromPayroll.reducer
};

export const prodReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return prodReducer(state, action);
}