import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtrosGastosRoutingModule } from './otros-gastos-routing.module';
import { OtrosGastosComponent } from './otros-gastos.component'
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from '../core/core.module'


@NgModule({
  declarations: [OtrosGastosComponent],
  imports: [
    CommonModule,
    OtrosGastosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class OtrosGastosModule { }
