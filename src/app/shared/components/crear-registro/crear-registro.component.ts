import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { add } from 'date-fns'
import { ITipoTransaccion } from 'src/app/core/interfaces/tipoTransaccion.interface'
import { UtilsService } from 'src/app/core/services/utils.service'
import { AlertService } from 'src/app/core/services/alert.service'
import { MainFactoryService } from 'src/app/core/services/main-factory.service'
import { DatePipe } from '@angular/common'
import { ConditionalExpr } from '@angular/compiler'
import { fromEvent } from 'rxjs'

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.scss']
})
export class CrearRegistroComponent implements OnInit {
  form: FormGroup
  validForm: boolean
  listTiposTransacccion: ITipoTransaccion[]
  lsCuotas: Number[]
  minDate: Date
  title: string
  active: boolean
  @Input() loadingCreandoRegistro: boolean
  @Input() contexto: string
  @Output() handleCrearRegistro = new EventEmitter()
  @Output() handleLimpiarRegistroSeleccionado = new EventEmitter()


  constructor(
    private formBuilder: FormBuilder,
    private localService: BsLocaleService,
    private utilsService: UtilsService,
    private alert: AlertService,
    public mainFactory: MainFactoryService,
    public datePipe: DatePipe,
  ) {
    this.validForm = true
    this.localService.use('es') // necesario para idioma de datepiker
    this.minDate = add(new Date(), { days: 0 })

    this.lsCuotas = this.utilsService.getLsCuotas()
    this.title = 'Guardar'

  }

  ngOnInit(): void {
    this.listTiposTransacccion = this.utilsService.getTipoTransaccion().filter(item => item.cuenta === this.contexto)
    this.active = true
    this.resetForm()
    this.mainFactory.cargarRegistroEdicion$
      .subscribe((active) => {
        if (active) {
          this.cargarItem()
          this.active = false
          this.title = 'Editar'
        }
      })

    this.mainFactory.limpiarFormularios$
      .subscribe((active) => {
        if (active) {
          this.resetForm()
        }
      })
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.handleCrearRegistro.emit(this.form.value)
      this.resetForm()
    } else {
      this.alert.error('Valide formulario')
    }
  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

  onHandleToggleSwitch({ active }) {
    this.form.patchValue({
      facturacionInmediata: active
    })
  }

  private cargarItem(): void {
    const registroSeleccionado = this.mainFactory.getData('registroSeleccionadoEdicion')
    if (this.contexto === 'debito' || this.contexto === 'otros') {
      this.form.patchValue({
        monto: registroSeleccionado?.monto,
        descripcion: registroSeleccionado?.descripcion,
        tipoTransaccion: this.listTiposTransacccion.filter(val => val.nombre === registroSeleccionado?.tipo)[0],
        fechaCompra: this.convertUTCDateToLocalDate(new Date(registroSeleccionado?.fechaCompra))
      })
    } else {
      this.form.patchValue({
        monto: registroSeleccionado?.monto,
        descripcion: registroSeleccionado?.descripcion,
        tipoTransaccion: this.listTiposTransacccion.filter(val => val.nombre === registroSeleccionado?.tipo)[0],
        fechaCompra: this.convertUTCDateToLocalDate(new Date(registroSeleccionado?.fechaCompra))
      })
    }
  }

  private convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
    const offset = date.getTimezoneOffset() / 60
    const hours = date.getHours()
    newDate.setHours(hours - offset)
    return newDate
  }

  public resetForm() {
    if (this.contexto === 'debito' || this.contexto === 'otros' ) {
      this.form = this.formBuilder.group({
        monto: [null, [Validators.required, Validators.max(1000000)]],
        descripcion: [null, [Validators.maxLength(250)]],
        tipoTransaccion: [null, Validators.required],
        fechaCompra: [this.minDate, Validators.required],
      })
    } else {
      this.form = this.formBuilder.group({
        monto: [null, [Validators.required, Validators.max(1000000)]],
        descripcion: [null, [Validators.maxLength(250)]],
        fechaCompra: [this.minDate, Validators.required],
        facturacionInmediata: [false],
        cuotas: this.contexto === 'internacional' ? [1, [Validators.min(1), Validators.required]] : [null, [Validators.required]],
      })
    }
    this.title = 'Guardar'
    this.handleLimpiarRegistroSeleccionado.emit()
    // this.form.controls['descripcion'].valueChanges
    //   .subscribe(value => {
    //     this.changeItem(value)
    //   })
  }

  changeItem(value: any) {
    const newDato = parseInt(value)
    if (!isNaN(newDato)) {
        return
    }
    const arrayDescripcion = value.split(' ')
    arrayDescripcion.forEach(item => {
      if (this.cantRepetidos(item) > 2 && isNaN(item)) {
        this.form.get('descripcion').setErrors({ incorrect: true })
        this.validForm = false
      } else {
        this.validForm = true
      }
    })
  }

  private cantRepetidos(letras) {
    return letras.split('').filter((c, i, a)=>a.indexOf(c) !== i).length + 1
  }
}


