import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { add } from 'date-fns'
import { ITipoTransaccion } from 'src/app/core/interfaces/tipoTransaccion.interface'
import { UtilsService } from 'src/app/core/services/utils.service'
import { AlertService } from 'src/app/core/services/alert.service'
import { IRegistrosCreados } from 'src/app/core/interfaces/IRegistrosCreados.interface'
import { MainFactoryService } from 'src/app/core/services/main-factory.service'
import { IDebito } from 'src/app/core/interfaces/iDebito.interface'
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.scss']
})
export class CrearRegistroComponent implements OnInit {
  form: FormGroup
  validForm: boolean
  listTiposTransacccion: ITipoTransaccion[]
  minDate: Date
  title: string

  @Input() loadingCreandoRegistro: boolean
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
    this.listTiposTransacccion = this.utilsService.getTipoTransaccion()
    this.title = 'Guardar'
  }

  ngOnInit(): void {
    this.resetForm()
    this.mainFactory.cargarRegistroEdicion$
      .subscribe((active) => {
        if (active) {
          this.cargarItem()
          this.title = 'Editar'
        }
      })
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.handleCrearRegistro.emit(this.form.value)
      this.resetForm()
    } else {
      this.validForm = false
      this.alert.error('Valide formulario')
    }
  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

  private cargarItem(): void {
    const registroSeleccionado = this.mainFactory.getData('registroSeleccionadoEdicion')
    this.form.patchValue({
      monto: registroSeleccionado?.monto,
      descripcion: registroSeleccionado?.descripcion,
      tipoTransaccion: this.listTiposTransacccion.filter(val => val.nombre === registroSeleccionado?.tipo )[0],
      fechaCompra: this.convertUTCDateToLocalDate(new Date(registroSeleccionado?.fechaCompra))
    })
  }

  public resetForm() {
    this.form = this.formBuilder.group({
      monto: ['', Validators.required],
      descripcion: [null, [Validators.maxLength(1500)]],
      tipoTransaccion: [null, Validators.required],
      fechaCompra: [this.minDate, Validators.required],
    })
    this.title = 'Guardar'
    this.handleLimpiarRegistroSeleccionado.emit()
  }

  private convertUTCDateToLocalDate(date) {
    const newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
}
}


