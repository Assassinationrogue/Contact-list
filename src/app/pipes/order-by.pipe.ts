import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[]): unknown {
    return value.sort((a, b) => a.fist_name.localeCompare(b.first_name));
  }
}
