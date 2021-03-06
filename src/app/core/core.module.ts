import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorSrcImgDirective } from './directives/error-src-img.directive'
import { AutoFocusDirective } from './directives/auto-focus.directive'
import { PreventKeyNumberDirective } from './directives/prevent-key-number.directive'
import { SortableColumnDirective } from './directives/sortable-column.directive'
import { FormatCurrencyPipe } from './pipes/format-currency.pipe'
import { CurrencyDirective } from './directives/currency.directive';
import { FilterTablePipe } from './pipes/filter-table.pipe'

@NgModule({
  declarations: [
    SortableColumnDirective,
    ErrorSrcImgDirective,
    AutoFocusDirective,
    PreventKeyNumberDirective,
    FormatCurrencyPipe,
    CurrencyDirective,
    FilterTablePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SortableColumnDirective,
    ErrorSrcImgDirective,
    AutoFocusDirective,
    PreventKeyNumberDirective,
    CurrencyDirective,
    FormatCurrencyPipe,
    FilterTablePipe,
  ]
})
export class CoreModule { }
