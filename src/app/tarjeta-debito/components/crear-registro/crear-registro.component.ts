import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IPagination } from 'src/app/core/interfaces/pagination.interface'
import { add } from 'date-fns'

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.scss']
})
export class CrearRegistroComponent implements OnInit {
  pagination: IPagination;
  form: FormGroup
  validForm: boolean;
  listProducts: [] = []
  minDate: Date;


  constructor(
    private formBuilder: FormBuilder,
    private localService: BsLocaleService,
  ) {
    this.validForm = true;
    this.localService.use('es') // necesario para idioma de datepiker
    this.minDate = add(new Date(), { days: 7 })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: [null, Validators.required],
      number: [1, Validators.required],
      selectSimple: [null, Validators.required],
      selectMultiple: [null, Validators.required],
      date: [this.minDate, Validators.required],
    })
  }

  onSubmitForm(): void {

  }

  onValidateErrorFields(field: string): boolean {
    return !this.validForm && this.form.get(field).invalid
  }

}
