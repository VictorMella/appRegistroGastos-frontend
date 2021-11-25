import { ITipoTransaccion } from "./tipoTransaccion.interface"

export interface IDebito {
  monto: number
  descripcion: string
  tipoTransaccion: ITipoTransaccion
  fachaCompra: string | Date
}
