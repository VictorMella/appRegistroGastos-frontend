import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetaCreditoInterComponent } from './tarjeta-credito-inter.component'

const routes: Routes = [  {
  path: '',
  component: TarjetaCreditoInterComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaCreditoInterRoutingModule { }
