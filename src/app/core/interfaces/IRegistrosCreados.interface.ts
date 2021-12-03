export interface IRegistrosCreados {
  _id?: string
  created: Date
  fechaCompra: Date,
  monto: number,
  tipo: string,
  descripcion: string,
  idUsuarioCreacion: number,
  activo: boolean
  mes?: string
  anio?: number
  facturacionInmediata?: boolean
  cuotas?: number

}
