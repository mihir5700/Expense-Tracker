import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 60): string {
    return value.length > limit ? value.slice(0,limit) + "..." : value;
  }
}
