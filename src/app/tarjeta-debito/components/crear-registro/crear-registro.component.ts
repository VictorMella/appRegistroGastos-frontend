import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { add } from 'date-fns'
import { ITipoTransaccion } from 'src/app/core/interfaces/tipoTransaccion.interface'
import { UtilsService } from 'src/app/core/services/utils.service'
import { AlertService } from 'src/app/core/services/alert.service'
@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.scss']
})
export class CrearRegistroComponent implements OnInit {
  form: FormGroup
  validForm: boolean;
  listTiposTransacccion: ITipoTransaccion[]
  minDate: Date;

  @Input() loadingCreandoRegistro: boolean;
  @Output() handleCrearRegistro = new EventEmitter()


  constructor(
    private formBuilder: FormBuilder,
    private localService: BsLocaleService,
    private utilsService: UtilsService,
    private alert: AlertService,
  ) {
    this.validForm = true;
    this.localService.use('es') // necesario para idioma de datepiker
    this.minDate = add(new Date(), { days: 0 })
    this.listTiposTransacccion = this.utilsService.getTipoTransaccion()
  }

  ngOnInit(): void {
    this.resetForm()
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.handleCrearRegistro.emit(this.form.value);
      this.resetForm()
    } else {
      this.validForm = false;
      this.alert.error('Valide formulario')
    }
  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

  private resetForm() {
    this.form = this.formBuilder.group({
      monto: ['' , Validators.required],
      descripcion: [null, [Validators.maxLength(1500)]],
      tipoTransaccion: [null, Validators.required],
      fachaCompra: [this.minDate, Validators.required],
    })
}

}


