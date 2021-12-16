import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { ValidarTokenGuard } from './core/guards/validar-token.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuentas/cuentas.module').then(mod => mod.CuentasModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },

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
