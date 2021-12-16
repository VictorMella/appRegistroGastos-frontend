import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DtoLogin } from 'src/app/core/interfaces/Dtologin.interface'
import { IRespuesta } from 'src/app/core/interfaces/iRespuesta.interface'
import { AlertService } from 'src/app/core/services/alert.service'
import { LoaderService } from 'src/app/core/services/loader.service'
import { MainFactoryService } from 'src/app/core/services/main-factory.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  validForm: boolean
  title: string
  @Input() loadingLogin: boolean
  @Input() contexto: string
  @Output() handleCrearRegistro = new EventEmitter()
  @Output() handleLimpiarRegistroSeleccionado = new EventEmitter()


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router,
    public loaderService: LoaderService,
    public mainFactory: MainFactoryService,
  ) {
    this.validForm = true
    this.title = 'Acceder'
  }

  ngOnInit(): void {
    this.resetForm()
    this.verMenu()
  }

  verMenu() {
    const arrayUrl = ['/auth/login', '/auth/registro']
    let urlActual = window.location.pathname
    const menuActivo = arrayUrl.includes(urlActual)
    this.mainFactory.activeMenus(menuActivo)
    this.mainFactory.setData('time', 500)
    console.log(menuActivo)
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const payload = this.form.value
      this.loadingLogin = true
      this.loginApp(payload)
      this.title = 'Accediento'
    } else {
      this.validForm = false
      this.alert.error('Valide formulario')
    }
  }

  loginApp(payload: DtoLogin) {
    this.authService.login(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          // this.loaderService.setLoading({ show: true, text: 'Validando información...' });
          this.router.navigateByUrl('/cuenta/debito')
          this.mainFactory.activeMenus(true)
          this.mainFactory.setData('time', 1500)
        } else {
          this.alert.error(resp.mensaje)
        }
        this.resetForm()
        this.loadingLogin = false
      }, error => {
        console.log(error)
        this.loadingLogin = false
      })
  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

  public resetForm() {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.title = 'Acceder'
  }
}



