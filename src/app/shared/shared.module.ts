import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { CrearRegistroComponent } from './components/crear-registro/crear-registro.component';
import { FiltroBusquedaComponent } from './components/filtro-busqueda/filtro-busqueda.component';
import { SwitchComponent } from './components/switch/switch.component'
import { VisualizarRegistroComponent } from './components/visualizar-registro/visualizar-registro.component'
import { CoreModule } from '../core/core.module'


defineLocale('es', esLocale);

@NgModule({
  declarations: [
    LoaderComponent,
    CrearRegistroComponent,
    PaginadorComponent,
    FiltroBusquedaComponent,
    VisualizarRegistroComponent,
    SwitchComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [
    LoaderComponent,
    NgSelectModule,
    BsDatepickerModule,
    PaginadorComponent,
    CrearRegistroComponent,
    FiltroBusquedaComponent,
    SwitchComponent,
    VisualizarRegistroComponent,
    BsDropdownModule,
  ],
  providers: [
    DatePipe,

  ]
})
export class SharedModule { }
