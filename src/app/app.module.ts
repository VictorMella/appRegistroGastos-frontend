import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module'
import { MenuComponent } from './menu/menu.component'
import { CuentasModule } from './cuentas/cuentas.module'
import { GlobalLoaderComponent } from './global-loader/global-loader.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CuentasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
