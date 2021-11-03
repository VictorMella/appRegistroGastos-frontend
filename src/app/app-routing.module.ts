import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'debito',
},
{
  path: 'debito',
  loadChildren: () => import('./tarjeta-debito/tarjeta-debito.module').then(mod => mod.TarjetaDebitoModule)
},
{
  path: 'credito',
  loadChildren: () => import('./tarjeta-credito-nac/tarjeta-credito-nac.module').then(mod => mod.TarjetaCreditoNacModule)
},
{
  path: 'internacional',
  loadChildren: () => import('./tarjeta-credito-inter/tarjeta-credito-inter.module').then(mod => mod.TarjetaCreditoInterModule)
},
{
  path: '**',
  pathMatch: 'full',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
