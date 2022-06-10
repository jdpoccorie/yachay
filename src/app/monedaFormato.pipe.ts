import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monedaFormato',
    pure: false})
export class MonedaFormatoPipe implements PipeTransform {

  transform(value: string): string {
    
    if(value == 'PEN'){
        return 'S/';
    }
    else{
        return '$'
    }

  }
}