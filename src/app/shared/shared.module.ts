import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginadorComponent } from './components/paginador/paginador.component';


defineLocale('es', esLocale);

@NgModule({
  declarations: [ LoaderComponent, PaginadorComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    LoaderComponent,
    NgSelectModule,
    BsDatepickerModule,
  ],
})
export class SharedModule { }
