import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearRegistroComponent } from './components/crear-registro/crear-registro.component'
import { VisualizarRegistroComponent } from './components/visualizar-registro/visualizar-registro.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'crear-registro', component: CrearRegistroComponent },
      { path: 'visualizar-registro', component: VisualizarRegistroComponent },

      { path: '**', redirectTo: 'crear-registro' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaDebitoRoutingModule { }
