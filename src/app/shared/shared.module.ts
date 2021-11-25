import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginadorComponent } from './components/paginador/paginador.component';


defineLocale('es', esLocale);

@NgModule({
  declarations: [
  LoaderComponent,
  PaginadorComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  exports: [
    LoaderComponent,
    NgSelectModule,
    BsDatepickerModule,
    PaginadorComponent,
    BsDropdownModule
  ],
  providers: [
    DatePipe,

  ]
})
export class SharedModule { }
