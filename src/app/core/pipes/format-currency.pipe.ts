import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: number, decimalLength: number = 0, abbr: string = ''): string {
    if (!value) {
      return `0`;
    }
    const separators = sessionStorage.separators ? JSON.parse(sessionStorage.separators) : {};
    const decimalDelimiter = separators.decimalsSeparator || ',';
    const chunkDelimiter = separators.thoudsandsSeparator || '.';
    let decimals = (value.toString().split('.')[1] || '').substring(0, decimalLength);
    decimals = this.removeZeros(decimals);
    const integer = (value.toString().split('.')[0]).replace(/\B(?=(\d{3})+(?!\d))/g, chunkDelimiter);
    return decimals.length > 0 ? `${integer}${decimalDelimiter}${decimals} ${abbr}` : `${integer} ${abbr}`;
  }

  private removeZeros(decimals): string {
    let indice = decimals.length;
    for (let i = decimals.length - 1; i > 0; i--) {
      if (decimals.substring(i, decimals.length) === 0) {
        indice--;
      }
      if (indice !== i) {
        i = 0;
      }
    }
    return decimals.substring(0, indice);
  }

}
