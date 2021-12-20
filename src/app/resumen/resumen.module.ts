import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenRoutingModule } from './resumen-routing.module';
import { ResumenComponent } from './resumen.component'
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from '../core/core.module'



@NgModule({
  declarations: [ResumenComponent],
  imports: [
    CommonModule,
    ResumenRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class ResumenModule { }
