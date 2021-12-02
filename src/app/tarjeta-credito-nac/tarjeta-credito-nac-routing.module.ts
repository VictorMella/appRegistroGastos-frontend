import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetaCreditoNacComponent } from './tarjeta-credito-nac.component'

const routes: Routes = [
  {
    path: '',
    component: TarjetaCreditoNacComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaCreditoNacRoutingModule { }
