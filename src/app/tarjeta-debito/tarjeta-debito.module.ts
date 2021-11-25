import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TarjetaDebitoRoutingModule } from './tarjeta-debito-routing.module'

import { TarjetaDebitoComponent } from './tarjeta-debito.component'
import { CrearRegistroComponent } from './components/crear-registro/crear-registro.component'
import { VisualizarRegistroComponent } from './components/visualizar-registro/visualizar-registro.component'
import { SharedModule } from '../shared/shared.module'
import { CoreModule } from '../core/core.module'



@NgModule({
  declarations: [TarjetaDebitoComponent, CrearRegistroComponent, VisualizarRegistroComponent],
  imports: [
    CommonModule,
    TarjetaDebitoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class TarjetaDebitoModule { }
