export interface DtoEditDebito {
  _id: string;
  monto?: number
  tipo?: string;
  descripcion?: string;
  fechaCompra?: string | Date;
}
