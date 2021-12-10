import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaCreditoInterRoutingModule } from './tarjeta-credito-inter-routing.module';
import { TarjetaCreditoInterComponent } from './tarjeta-credito-inter.component';
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from '../core/core.module'


@NgModule({
  declarations: [TarjetaCreditoInterComponent],
  imports: [
    CommonModule,
    TarjetaCreditoInterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class TarjetaCreditoInterModule { }
