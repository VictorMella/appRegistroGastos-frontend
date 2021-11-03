import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaCreditoNacRoutingModule } from './tarjeta-credito-nac-routing.module';
import { TarjetaCreditoNacComponent } from './tarjeta-credito-nac.component';


@NgModule({
  declarations: [TarjetaCreditoNacComponent],
  imports: [
    CommonModule,
    TarjetaCreditoNacRoutingModule
  ]
})
export class TarjetaCreditoNacModule { }
