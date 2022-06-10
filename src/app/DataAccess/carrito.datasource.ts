import { checkout } from '../Model/checkout.model';
import { HabitacionesSeleccionadas } from '../Model/habitaciones-selecionadas.model';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';
import { SeleccionHabitacion } from '../Model/seleccion-habitacion.model';

export class CarritoDataSource {

    public habitacionesSeleccionadas: SeleccionHabitacion[];
    public checkOutObj: checkout;
    public respuestaServer: RespuestaTransaccion;
    private static instance: CarritoDataSource;
    
    private constructor() {
        this.habitacionesSeleccionadas = [];
        this.checkOutObj = new checkout();
        this.respuestaServer = new RespuestaTransaccion();
    }

    public static getInstance(): CarritoDataSource {
        if (!CarritoDataSource.instance) {
            CarritoDataSource.instance = new CarritoDataSource();
        }
        return CarritoDataSource.instance;
    }


}