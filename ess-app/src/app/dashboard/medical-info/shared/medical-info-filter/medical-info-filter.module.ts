import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceTypesResolve } from './insurance-types.resolver';
import { ProviderCitiesResolve } from './provider-cities.resolver';
import { ProviderTypesResolve } from './provider-types.resolver';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    ProviderTypesResolve,
    InsuranceTypesResolve,
    ProviderCitiesResolve
  ]
})
export class MedicalInfoFilterModule { }
