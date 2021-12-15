import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module'
import { CoreModule } from '../core/core.module'


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class CuentasModule { }
