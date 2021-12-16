export interface DtoInsertDebito {
  monto: number;
  tipo: string;
  descripcion: string;
  fechaCompra: string | Date;
  idUsuarioCreacion: number
}
