import { Pipe, PipeTransform } from '@angular/core';
import { TunisiaService } from '../services/tunisia.service';

@Pipe({
  name: 'tndCurrency',
  standalone: true
})
export class TndCurrencyPipe implements PipeTransform {
  constructor(private tunisiaService: TunisiaService) {}

  transform(value: number | null | undefined, locale: string = 'fr-TN'): string {
    if (value === null || value === undefined) return '0,000 TND';
    return this.tunisiaService.formatTND(value, locale);
  }
}
