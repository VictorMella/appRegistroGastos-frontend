export type SortDirection = 'asc' | 'desc' | '';
export interface ISortDirection {
  column: string;
  direction: SortDirection;
}
