import { Pipe, PipeTransform } from '@angular/core';
import { SeleccionHabitacion } from './Model/seleccion-habitacion.model';

@Pipe({
    name: 'totalHabitaciones',
    pure: false})
export class TotalHabitacionesPipe implements PipeTransform {

  transform(value: SeleccionHabitacion[]): number {
    var num2 = 0;
    value.forEach(function (item) {
        num2 = num2 + 1;
      });     
    return num2;
  }
}