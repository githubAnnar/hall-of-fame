import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedTime'
})
export class FormattedTimePipe implements PipeTransform {

  transform(value: number): string {
    // get hours
    const hours = Math.floor(value / 3600);
    const minute = Math.floor(value / 60);
    const second = (value - (hours * 3600) - (minute * 60));
    return `${hours}:${minute}:${second.toLocaleString('nb-no', { minimumIntegerDigits: 2, minimumFractionDigits: 1, useGrouping: false })}`
  }
}
