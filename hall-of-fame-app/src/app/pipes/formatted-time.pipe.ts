import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedTime'
})
export class FormattedTimePipe implements PipeTransform {

  transform(value: number): string {
    // get hours
    const hours = Math.round((value / 3600) + 0.5);
    const minute = Math.round((value / 60) + 0.5);
    const second = value - (hours * 3600) - (minute * 60);
    return `${hours}:${minute}:${second}`
  }

}
