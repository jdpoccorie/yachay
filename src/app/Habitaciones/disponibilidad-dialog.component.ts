import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarritoDataSource } from '../DataAccess/carrito.datasource';
import { HabitacionesRepository } from '../DataAccess/habitaciones.repository';
import { HabitacionesSeleccionadas } from '../Model/habitaciones-selecionadas.model';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';

@Component({
    selector: 'disponibilidad-dialog',
    templateUrl: './disponibilidad-dialog.component.html'
  })
  export class DisponibilidadDialogComponent {
      
    public isOk : boolean = false;
    public respuestaCheckOut: RespuestaTransaccion;
    public showLoadingSpinner: boolean = true;

    constructor(public dialogRef: MatDialogRef<DisponibilidadDialogComponent>, private habitacionesRep: HabitacionesRepository, private router: Router){
        this.respuestaCheckOut = new RespuestaTransaccion();
        this.verificarDisponibilidad();
    }

    verificarDisponibilidad(){             
        this.showLoadingSpinner = true;
        var checkOutModel = CarritoDataSource.getInstance().checkOutObj;
        
        let seleccionInicial = new HabitacionesSeleccionadas();
        seleccionInicial.startDate = checkOutModel.startDate;
        seleccionInicial.endDate = checkOutModel.endDate;
        seleccionInicial.listaSeleccionHabitacion = CarritoDataSource.getInstance().habitacionesSeleccionadas;

        this.habitacionesRep.verificarDisponibilidad(seleccionInicial).subscribe(
            (data) => { this.respuestaCheckOut = data; },
            error => {
                this.showErrorConexionMessage();
            },
            () => { 
            this.showLoadingSpinner = false;

            if(this.respuestaCheckOut.TipoRespuesta == 0){                
                this.router.navigateByUrl("/checkout");
                this.dialogRef.close();
                this.isOk = true;
            }      
            else{
                this.isOk = false;
            }
        });            
    }
    
    showErrorConexionMessage(){

    }
  }