import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarTokenGuard } from '../core/guards/validar-token.guard'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'debito',
        loadChildren: () => import('../tarjeta-debito/tarjeta-debito.module').then(mod => mod.TarjetaDebitoModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: 'credito',
        loadChildren: () => import('../tarjeta-credito-nac/tarjeta-credito-nac.module').then(mod => mod.TarjetaCreditoNacModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: 'internacional',
        loadChildren: () => import('../tarjeta-credito-inter/tarjeta-credito-inter.module').then(mod => mod.TarjetaCreditoInterModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: 'otras',
        loadChildren: () => import('../otros-gastos/otros-gastos.module').then(mod => mod.OtrosGastosModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: 'resumen',
        loadChildren: () => import('../resumen/resumen.module').then(mod => mod.ResumenModule),
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasRoutingModule { }
