import { Pipe, PipeTransform } from '@angular/core';
import { SeleccionHabitacion } from './Model/seleccion-habitacion.model';

@Pipe({
    name: 'totalSeleccionHab',
    pure: false})
export class TotalSeleccionHabPipe implements PipeTransform {

  transform(value: SeleccionHabitacion[], exponent?: number): number {
    var num = 0;
    value.forEach(function (item) {
        num = num + item.PrecioSubTotal;
      });     
    return num;
  }
}