import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'debito',
        loadChildren: () => import('../tarjeta-debito/tarjeta-debito.module').then(mod => mod.TarjetaDebitoModule)
      },
      {
        path: 'credito',
        loadChildren: () => import('../tarjeta-credito-nac/tarjeta-credito-nac.module').then(mod => mod.TarjetaCreditoNacModule)
      },
      {
        path: 'internacional',
        loadChildren: () => import('../tarjeta-credito-inter/tarjeta-credito-inter.module').then(mod => mod.TarjetaCreditoInterModule)
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasRoutingModule { }
