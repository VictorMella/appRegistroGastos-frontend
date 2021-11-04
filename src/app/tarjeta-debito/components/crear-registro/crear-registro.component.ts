import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IPagination } from 'src/app/core/interfaces/pagination.interface'
import { add } from 'date-fns'
import { ITipoTransaccion } from 'src/app/core/interfaces/tipoTransaccion.interface'
import { UtilsService } from 'src/app/core/services/utils.service'
import { AlertService } from 'src/app/core/services/alert.service'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.scss']
})
export class CrearRegistroComponent implements OnInit {
  pagination: IPagination;
  form: FormGroup
  validForm: boolean;
  listTiposTransacccion: ITipoTransaccion[]
  minDate: Date;

  @Output() handleCrearRegistro: EventEmitter<any> = new EventEmitter()


  constructor(
    private formBuilder: FormBuilder,
    private localService: BsLocaleService,
    private utilsService: UtilsService,
    private alert : AlertService
  ) {
    this.validForm = true;
    this.localService.use('es') // necesario para idioma de datepiker
    this.minDate = add(new Date(), { days: 0 })
    this.listTiposTransacccion = this.utilsService.getTipoTransaccion()
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      monto: ['' , Validators.required],
      descripcion: [null, [Validators.maxLength(1500)]],
      tipoTransaccion: [null, Validators.required],
      // selectMultiple: [null, Validators.required],
      fachaCompra: [this.minDate, Validators.required],
    })

    this.form.controls['monto'].valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      console.log(value);
    })
  }



  onSubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.validForm = false;
      this.alert.error('Valide formulario')
    }
  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

}


