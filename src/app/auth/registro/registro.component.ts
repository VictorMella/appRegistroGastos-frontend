import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DtoCrearUsuario } from 'src/app/core/interfaces/DtoCrearUsuario.interface'
import { IRespuesta } from 'src/app/core/interfaces/iRespuesta.interface'
import { AlertService } from 'src/app/core/services/alert.service'
import { LoaderService } from 'src/app/core/services/loader.service'
import { MainFactoryService } from 'src/app/core/services/main-factory.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  form: FormGroup
  validForm: boolean
  title: string
  loadingCreate: boolean

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router,
    public loaderService: LoaderService,
    public mainFactory: MainFactoryService,
  ) {
    this.validForm = true
    this.title = 'Crear'
  }

  ngOnInit(): void {
    this.resetForm()
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const payload = this.form.value
      this.loadingCreate = true
      this.registroUsuario(payload)
      this.title = 'Creando'
    } else {
      this.validForm = false
      this.alert.error('Valide formulario')
    }
  }

  registroUsuario(payload: DtoCrearUsuario) {
    this.authService.registro(payload)
      .subscribe((resp: IRespuesta) => {
        console.log(resp)
        if (resp.ok) {
          this.router.navigateByUrl('/cuenta/debito')
        } else {
          this.alert.error(resp.mensaje)
        }
        this.resetForm()
        this.loadingCreate = false
      }, error => {
        console.log(error)
        this.loadingCreate = false
      })
  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

  public resetForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(150)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.title = 'Crear'
  }
}



