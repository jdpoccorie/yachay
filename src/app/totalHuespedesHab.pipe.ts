import { Pipe, PipeTransform } from '@angular/core';
import { SeleccionHabitacion } from './Model/seleccion-habitacion.model';

@Pipe({
    name: 'totalHuepedesHab',
    pure: false})
export class TotalHuepedesHabPipe implements PipeTransform {

  transform(value: SeleccionHabitacion[]): number {
    var num3 = 0;
    value.forEach(function (item) {
        num3 = num3 + item.Capacidad;
      });     
    return num3;
  }
}