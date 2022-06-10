import { Component, Inject } from '@angular/core';
import { CarritoDataSource } from '../DataAccess/carrito.datasource';
import { checkout } from '../Model/checkout.model';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';
import { SeleccionHabitacion } from '../Model/seleccion-habitacion.model';
import { HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: "DetalleOrden",
    templateUrl: "./detalle-orden.component.html",
    styleUrls: ["./detalle-orden.component.css"]
})
export class DetalleOrdenComponent {

    public showLoadingSpinner: boolean = false;
    public showLoadingSpinnerEnviarMensaje: boolean = false;
    public newMessage: string;
    public listaHabitacionesSeleccionadas: SeleccionHabitacion[] = [];
    public checkOutModel : checkout;
    public respuestaServer: RespuestaTransaccion;
    public moneda: string;

    constructor(@Inject(DOCUMENT) private document: Document){
        this.checkOutModel = CarritoDataSource.getInstance().checkOutObj;
        this.listaHabitacionesSeleccionadas = CarritoDataSource.getInstance().habitacionesSeleccionadas
        this.respuestaServer = CarritoDataSource.getInstance().respuestaServer;
        this.moneda = this.checkOutModel.monedaPago;
    }

    enviarNuevoMensaje(){
        if(typeof this.newMessage!='undefined' && this.newMessage && this.newMessage.length > 0){
   
        }
    }

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        this.document.location.href = '/';
    }
}