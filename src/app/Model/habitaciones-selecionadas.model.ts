import { SeleccionHabitacion } from './seleccion-habitacion.model';

export class HabitacionesSeleccionadas{
    constructor(public startDate?:string,
            public endDate?:string,
            public listaSeleccionHabitacion?: SeleccionHabitacion[]){
        }
}