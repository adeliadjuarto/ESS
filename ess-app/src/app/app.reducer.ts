import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { environment } from '../environments/environment';

import * as fromLogin from './login/shared/login.reducer';
import * as fromDashboard from './dashboard/shared/dashboard.reducer';
import * as fromPayroll from './dashboard/payroll/shared/payroll.reducer';
import * as fromStatus from './dashboard/status/shared/status.reducer';
import * as fromApprovals from './dashboard/approvals/shared/approvals.reducer';
import * as fromUser from './dashboard/account/shared/user.reducer';
import * as fromContacts from './dashboard/contacts/shared/contacts.reducer';
import * as fromMedicalInfo from './dashboard/medical-info/shared/medical-info.reducer';
import * as fromSearchBar from './shared/search-bar/search-bar.reducer';
import * as fromSearchFilter from './shared/search-filter/search-filter.reducer';
import * as fromHcmInfo from './dashboard/hcm-info/shared/hcm-info.reducer';

export interface AppState {
    loginState: fromLogin.LoginState;
    dashboardState: fromDashboard.DashboardState;
    payrollState: fromPayroll.PayrollState;
    statusState: fromStatus.StatusState;
    approvalsState: fromApprovals.ApprovalsState;
    userState: fromUser.UserState;
    contactsState: fromContacts.State;
    medicalInfoState: fromMedicalInfo.State;
    searchBarState: fromSearchBar.State;
    searchFilterState: fromSearchFilter.State;
    hcmInfoState: fromHcmInfo.State;

}

const reducers = {
    loginState: fromLogin.reducer,
    dashboardState: fromDashboard.reducer,
    payrollState: fromPayroll.reducer,
    statusState: fromStatus.reducer,
    approvalsState: fromApprovals.reducer,
    userState: fromUser.reducer,
    contactsState: fromContacts.reducer,
    medicalInfoState: fromMedicalInfo.reducer,
    searchBarState: fromSearchBar.reducer,
    searchFilterState: fromSearchFilter.reducer,
    hcmInfoState: fromHcmInfo.reducer,

};

export const prodReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return prodReducer(state, action);
}
