import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetaDebitoComponent } from './tarjeta-debito.component'

const routes: Routes = [
  {
    path: '',
    component: TarjetaDebitoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaDebitoRoutingModule { }
