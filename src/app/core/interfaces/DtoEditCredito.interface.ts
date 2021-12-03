export interface DtoEditCredito {
  _id: string;
  monto?: number
  tipo?: string;
  descripcion?: string;
  fechaCompra?: string | Date;
  facturacionInmediata: boolean
  cuotas: number
}
