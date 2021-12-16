export interface DtoInsertCredito {
  monto: number;
  tipo: string;
  descripcion: string;
  fechaCompra: string | Date;
  facturacionInmediata: boolean
  cuotas: number
  nacional: boolean
  idUsuarioCreacion: number
}
