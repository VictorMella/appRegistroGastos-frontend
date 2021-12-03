import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaCreditoNacRoutingModule } from './tarjeta-credito-nac-routing.module';
import { TarjetaCreditoNacComponent } from './tarjeta-credito-nac.component';
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from '../core/core.module'


@NgModule({
  declarations: [TarjetaCreditoNacComponent],
  imports: [
    CommonModule,
    TarjetaCreditoNacRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class TarjetaCreditoNacModule { }
