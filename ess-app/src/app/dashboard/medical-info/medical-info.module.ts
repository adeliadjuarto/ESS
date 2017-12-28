import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from './../../shared/user-interface.module';

import { MedicalInfoComponent } from './medical-info.component';
import { MedicalInfoDetailsComponent } from './medical-info-details/medical-info-details.component';
import { MedicalInfoDetailMapComponent } from './medical-info-detail-map/medical-info-detail-map.component';
import { MedicalInfoService } from './shared/medical-info.service';
import { MedicalInfoFilterModule } from './shared/medical-info-filter/medical-info-filter.module';
import { ProviderResolve } from './shared/provider.resolver';
import { MedicalDetailsCardComponent } from './medical-info-details/medical-details-card/medical-details-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    MedicalInfoFilterModule,
  ],
  declarations: [
    MedicalInfoComponent,
    MedicalInfoDetailsComponent,
    MedicalInfoDetailMapComponent,
    MedicalDetailsCardComponent,
  ],
  providers: [
    MedicalInfoService,
    ProviderResolve
  ]
})
export class MedicalInfoModule { }
