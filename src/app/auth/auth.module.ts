import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module'
import { CoreModule } from '../core/core.module'
import { RegistroComponent } from './registro/registro.component'
import { LoginComponent } from './login/login.component'
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component'


@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
