import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtrosGastosComponent } from './otros-gastos.component'

const routes: Routes = [
  {
    path: '',
    component: OtrosGastosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtrosGastosRoutingModule { }
