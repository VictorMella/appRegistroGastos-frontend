import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuentas/cuentas.module').then(mod => mod.CuentasModule)
  },
  // {
  //   path: 'debito',
  //   loadChildren: () => import('./tarjeta-debito/tarjeta-debito.module').then(mod => mod.TarjetaDebitoModule)
  // },
  // {
  //   path: 'credito',
  //   loadChildren: () => import('./tarjeta-credito-nac/tarjeta-credito-nac.module').then(mod => mod.TarjetaCreditoNacModule)
  // },
  // {
  //   path: 'internacional',
  //   loadChildren: () => import('./tarjeta-credito-inter/tarjeta-credito-inter.module').then(mod => mod.TarjetaCreditoInterModule)
  // },
  {
    path: '**',
    redirectTo: 'auth'
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
