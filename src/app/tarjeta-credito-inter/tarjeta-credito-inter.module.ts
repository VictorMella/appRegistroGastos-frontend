import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaCreditoInterRoutingModule } from './tarjeta-credito-inter-routing.module';
import { TarjetaCreditoInterComponent } from './tarjeta-credito-inter.component';


@NgModule({
  declarations: [TarjetaCreditoInterComponent],
  imports: [
    CommonModule,
    TarjetaCreditoInterRoutingModule
  ]
})
export class TarjetaCreditoInterModule { }
