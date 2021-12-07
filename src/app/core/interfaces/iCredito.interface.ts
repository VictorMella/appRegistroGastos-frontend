import { ITipoTransaccion } from "./tipoTransaccion.interface"

export interface ICredito {
  monto: number
  descripcion: string
  tipoTransaccion: ITipoTransaccion
  fechaCompra: Date,
  facturacionInmediata: boolean
  cuotas: number
  nCuota: number
}
