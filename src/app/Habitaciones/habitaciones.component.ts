import { Component, ElementRef } from "@angular/core";
import { HabitacionesRepository } from '../DataAccess/habitaciones.repository';
import { FiltroConsultaHab } from '../Model/filtro-consulta-hab.model';
import { TipoHabitacion } from '../Model/tipo-habitacion.model';
import { ViewChild } from '@angular/core';
import { SeleccionHabitacion } from '../Model/seleccion-habitacion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoDataSource } from '../DataAccess/carrito.datasource';
import { checkout } from '../Model/checkout.model';
import { PrecioVenta } from '../Model/precio-venta.model';
import { MatDialog } from '@angular/material/dialog';
import { DisponibilidadDialogComponent } from './disponibilidad-dialog.component';
import { DatePipe } from "@angular/common";

@Component({
    selector: "habitaciones",
    templateUrl: "./habitaciones.component.html",
    styleUrls: ["./habitaciones.component.css"]
})
export class HabitacionesComponent {
    
    public showLoadingSpinner: boolean = false;
    public listaHabitaciones: TipoHabitacion[];
    public listaHabitacionesSeleccionadas: SeleccionHabitacion[] = [];
    public fechaCheckIn: string;
    public fechaCheckOut: string;
    public numeroNoches: number;
    public moneda: string;
    public showConsultaFechas: boolean = false;
    public nroHabitaciones: number;

    constructor(public dialog: MatDialog, private hapRepositorio: HabitacionesRepository, private activeRoute: ActivatedRoute, private router: Router, public datepipe: DatePipe) {
        this.numeroNoches = 0;
        this.nroHabitaciones = 0;
        CarritoDataSource.getInstance().checkOutObj = new checkout();
        CarritoDataSource.getInstance().habitacionesSeleccionadas = [];
        this.moneda = 'PEN';
        
        var checkIn = activeRoute.snapshot.params["checkIn"];
        var checkOut = activeRoute.snapshot.params["checkOut"];
        var nroPersonas = activeRoute.snapshot.params["nroPersonas"];

        if(checkIn != undefined && checkOut != undefined && nroPersonas != undefined){
            var filtro = new FiltroConsultaHab();
            filtro.startDate = checkIn;
            filtro.endDate = checkOut;
            filtro.nroPersonas = nroPersonas;
            this.procesarConsulta(filtro);
        }
        else{
            this.showConsultaFechas = true;
        }
    }

    SeleccionarHabitacionPrecio(item: TipoHabitacion, precio: PrecioVenta){
        var nuevaSeleccion = new SeleccionHabitacion();
        nuevaSeleccion.Capacidad = item.Capacidad;
        nuevaSeleccion.IdTipoHabitacion = item.IdTipoHabitacion;
        nuevaSeleccion.Moneda = item.Moneda;
        nuevaSeleccion.nroNoches = this.numeroNoches;

        if(precio){
            nuevaSeleccion.PrecioSubTotal = precio.Precio * this.numeroNoches;
            nuevaSeleccion.PrecioXNoche = precio.Precio;     
        }
        else{
            nuevaSeleccion.PrecioSubTotal = item.PrecioXNoche * this.numeroNoches;
            nuevaSeleccion.PrecioXNoche = item.PrecioXNoche;
        }
        
        nuevaSeleccion.TipoHabitacion = item.TipoHabitacion;
        nuevaSeleccion.Base64ImageBanner1 = item.Base64ImageBanner1;
        nuevaSeleccion.Base64ImageBanner2 = item.Base64ImageBanner2;
        nuevaSeleccion.Base64ImageBanner3 = item.Base64ImageBanner3;
        this.listaHabitacionesSeleccionadas.push(nuevaSeleccion);
    }

    eliminarItem(itemHab: SeleccionHabitacion){        
        this.listaHabitacionesSeleccionadas = this.listaHabitacionesSeleccionadas.filter(item => item !== itemHab);
    }

    procesarConsulta(filtro: FiltroConsultaHab) {
        this.showLoadingSpinner = true;
        this.hapRepositorio.cargarConsultaHabitacionesPorFecha(filtro.nroPersonas, this.datepipe.transform(Date.parse(filtro.startDate), 'yyyy-MM-dd')).subscribe(
        data => {
            this.listaHabitaciones = data;
            this.fechaCheckIn = filtro.startDate;
            this.fechaCheckOut = filtro.endDate;

            if(this.listaHabitaciones.length > 0){
                this.moneda = this.listaHabitaciones[0].Moneda;
            }            

            var date1 = new Date(Date.parse(this.fechaCheckIn));
            var date2 = new Date(Date.parse(this.fechaCheckOut));

            // To calculate the time difference of two dates 
            var Difference_In_Time = date2.getTime() - date1.getTime(); 
  
            // To calculate the no. of days between two dates 
            this.numeroNoches = Difference_In_Time / (1000 * 3600 * 24); 
        },
        error => {
            this.showErrorConexionMessage();
        },
        () => {                 
            this.showLoadingSpinner = false;                              
        } );
    }

    ProcederReserva(){
        if(this.listaHabitacionesSeleccionadas.length > 0){
            var strDate1 = this.datepipe.transform(Date.parse(this.fechaCheckIn), 'yyyy-MM-dd');
            var strDate2 = this.datepipe.transform(Date.parse(this.fechaCheckOut), 'yyyy-MM-dd');
            CarritoDataSource.getInstance().checkOutObj.startDate = strDate1;
            CarritoDataSource.getInstance().checkOutObj.endDate = strDate2;
            CarritoDataSource.getInstance().habitacionesSeleccionadas = this.listaHabitacionesSeleccionadas;

            var num = 0;
            this.listaHabitacionesSeleccionadas.forEach(function (item) {
                num = num + item.PrecioSubTotal;
              }); 
            CarritoDataSource.getInstance().checkOutObj.montoPago = num;  

            let dialogRef = this.dialog.open(DisponibilidadDialogComponent, {
                disableClose: true
            });
        }
    }

    imagePrev(event, estadoImagen:TipoHabitacion){

        let elements = event.target.parentNode.parentNode.querySelectorAll('.carousel-item');
        elements.forEach(element => {         
            element.classList.remove('active');
        });

        let indicators = event.target.parentNode.parentNode.querySelectorAll('li');
        indicators.forEach(element => {         
            element.classList.remove('active');
        });

        let currentItem = null;
        let indicator = null;

        if(estadoImagen.estadoImagen == undefined){
            estadoImagen.estadoImagen = 0;
        }

        if(estadoImagen.estadoImagen > 0){
            estadoImagen.estadoImagen = estadoImagen.estadoImagen - 1;
        }

        if(estadoImagen.estadoImagen == 0){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#firstItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#firstItemIndicator');
        }
        else if(estadoImagen.estadoImagen == 1){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#secondItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#secondItemIndicator');
        }
        else if(estadoImagen.estadoImagen == 2){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#thridItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#thridItemIndicator');
        }

        currentItem[0].classList.add('active');
        indicator[0].classList.add('active');
    }

    imageNext(event, estadoImagen:TipoHabitacion){
        let elements = event.target.parentNode.parentNode.querySelectorAll('.carousel-item');
        elements.forEach(element => {         
            element.classList.remove('active');
        });

        let indicators = event.target.parentNode.parentNode.querySelectorAll('li');
        indicators.forEach(element => {         
            element.classList.remove('active');
        });

        let currentItem = null;
        let indicator = null;

        if(estadoImagen.estadoImagen == undefined){
            estadoImagen.estadoImagen = 0;
        }

        if(estadoImagen.estadoImagen < 2){
            estadoImagen.estadoImagen = estadoImagen.estadoImagen + 1;
        }

        if(estadoImagen.estadoImagen == 0){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#firstItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#firstItemIndicator');
        }
        else if(estadoImagen.estadoImagen == 1){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#secondItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#secondItemIndicator');
        }
        else if(estadoImagen.estadoImagen == 2){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#thridItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#thridItemIndicator');
        }

        currentItem[0].classList.add('active');
        indicator[0].classList.add('active');
    }

    itemClick(event, item, estadoImagen:TipoHabitacion){
        let elements = event.target.parentNode.parentNode.querySelectorAll('.carousel-item');
        elements.forEach(element => {         
            element.classList.remove('active');
        });

        let indicators = event.target.parentNode.parentNode.querySelectorAll('li');
        indicators.forEach(element => {         
            element.classList.remove('active');
        });

        let currentItem = null;
        let indicator = null;

        estadoImagen.estadoImagen = item;

        if(estadoImagen.estadoImagen == 0){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#firstItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#firstItemIndicator');
        }
        else if(estadoImagen.estadoImagen == 1){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#secondItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#secondItemIndicator');
        }
        else if(estadoImagen.estadoImagen == 2){
            currentItem =  event.target.parentNode.parentNode.querySelectorAll('#thridItem');
            indicator = event.target.parentNode.parentNode.querySelectorAll('#thridItemIndicator');
        }

        currentItem[0].classList.add('active');
        indicator[0].classList.add('active');


    }
    
    showErrorConexionMessage(){

    }
}