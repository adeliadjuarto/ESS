import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from '../core/constant/index';
import { AuthenticatedGuard } from '../core/network/authentication/shared/authenticated.guard';
import { AuthorizedGuard } from '../core/network/authentication/shared/authorized.guard';
import { Permissions } from '../core/network/authentication/shared/permission.enum';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { RequestComponent } from './request/request.component';
import { StatusComponent } from './status/status.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollViewerComponent } from './payroll/payroll-viewer/payroll-viewer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsResolve } from './contacts/shared/contacts.resolver';
import { DocumentYearsResolve } from './hcm-info/shared/document-years/document-years.resolver';
import { HcmInfoComponent } from './hcm-info/hcm-info.component';
import { PkbComponent } from './hcm-info/pkb/pkb.component';
import { PkbViewerComponent } from './hcm-info/pkb/pkb-viewer/pkb-viewer.component';
import { SkListComponent } from './hcm-info/sk-se/sk-list/sk-list.component';
import { SkViewerComponent } from './hcm-info/sk-se/sk-viewer/sk-viewer.component';
import { MedicalInfoDetailsComponent } from './medical-info/medical-info-details/medical-info-details.component';
import { MedicalInfoDetailMapComponent } from './medical-info/medical-info-detail-map/medical-info-detail-map.component';
import { MedicalInfoComponent } from './medical-info/medical-info.component';
import { InsuranceTypesResolve } from './medical-info/shared/medical-info-filter/insurance-types.resolver';
import { ProviderCitiesResolve } from './medical-info/shared/medical-info-filter/provider-cities.resolver';
import { ProviderTypesResolve } from './medical-info/shared/medical-info-filter/provider-types.resolver';
import { ProviderResolve } from './medical-info/shared/provider.resolver';
import { YearListComponent } from './hcm-info/sk-se/year-list/year-list.component';


const routes: Routes = [
  {
    path: PATH.EMPTY,
    canActivateChild: [AuthenticatedGuard],
    component: DashboardComponent,
    children: [
      {
        path: PATH.EMPTY,
        component: MenuComponent,
      },
      {
        path: PATH.CHAT,
        component: ChatComponent,
        data: {
          title: 'Chat',
        }
      },
      {
        path: PATH.HCM_INFO,
        data: {
          title: 'HCM Info',
        },
        children: [
          {
            path: PATH.EMPTY,
            component: HcmInfoComponent,
          },
          {
            path: PATH.PKB,
            data: {
              title: 'PKB',
            },
            children: [
              {
                path: PATH.EMPTY,
                component: PkbComponent,
                resolve: {
                  documentYears: DocumentYearsResolve
                }
              },
              {
                path: PATH.PARAM.ID,
                component: PkbViewerComponent,
              },
            ],
          },
          {
            path: PATH.SK_SE,
            data: {
              title: 'SK/SE',
            },
            children: [
              {
                path: PATH.EMPTY,
                component: YearListComponent,
                resolve: {
                  documentYears: DocumentYearsResolve
                }
              },
              {
                path: PATH.PARAM.YEAR,
                children: [
                  {
                    path: PATH.EMPTY,
                    component: SkListComponent,
                  },
                  {
                    path: PATH.PARAM.ID,
                    component: SkViewerComponent,
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        path: PATH.MEDICAL_INFO,
        canActivate: [AuthorizedGuard],
        data: {
          title: 'Medical Provider Info',
        },
        children: [
          {
            path: PATH.EMPTY,
            component: MedicalInfoComponent,
            resolve: {
              insuranceTypes: InsuranceTypesResolve,
              providerCities: ProviderCitiesResolve,
              providerTypes: ProviderTypesResolve
            }
          },
          {
            path: PATH.DETAILS,
            children: [
              {
                path: PATH.EMPTY,
                component: MedicalInfoDetailsComponent
              },
              {
                path: `${PATH.MAP}/${PATH.PARAM.ID}`,
                component: MedicalInfoDetailMapComponent,
                resolve: {
                  provider: ProviderResolve
                }
              }
            ]
          }
        ]
      },
      {
        path: PATH.CONTACTS,
        canActivate: [AuthorizedGuard],
        data: {
          title: 'Contacts',
        },
        children: [
          {
            path: PATH.EMPTY,
            component: ContactsComponent,
          },
          {
            path:  PATH.PARAM.ID,
            component: ContactDetailComponent,
            resolve: {
              contact: ContactsResolve
            }
          },
        ]
      },
      {
        path: PATH.REQUEST,
        data: {
          title: 'Request'
        },
        loadChildren: 'app/dashboard/request/request.module#RequestModule'
      },
      {
        path: PATH.STATUS,
        data: {
          title: 'Status'
        },
        component: StatusComponent
      },
      {
        path: PATH.APPROVALS,
        data: {
          title: 'Approval'
        },
        component: ApprovalsComponent
      },
      {
        path: PATH.PAYROLL,
        data: {
          title: 'Payroll'
        },
        children: [
          {
            path: PATH.EMPTY,
            component: PayrollComponent
          },
          {
            path: PATH.PAYROLL_SLIP,
            component: PayrollViewerComponent
          }
        ]
      },
      {
        path: PATH.CALENDAR,
        data: {
          title: 'Calendar'
        },
        component: CalendarComponent
      }
    ]
  },
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
