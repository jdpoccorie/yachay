import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabitacionesRepository } from './DataAccess/habitaciones.repository';
import { TipoHabitacion } from './Model/tipo-habitacion.model';
import { FiltroConsultaHab } from './Model/filtro-consulta-hab.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  public errorMessage: string = "";
  public filtro: FiltroConsultaHab; 

  public minStartDate: Date;
  public maxStartDate: Date;

  public minEndDate: Date;
  public maxEndDate: Date;

  @Input() selectorHotel: number = 0;
  
  @Output() dataEvent = new EventEmitter();

  public checkIn: string;
  public checkOut: string;
  public nroPersonas: string;
  public urlReservas: string;

  constructor(public dialog: MatDialog, private router: Router){
        
    this.filtro = new FiltroConsultaHab();
    this.filtro.nroPersonas = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
          };    
    
    const currentYear = new Date().getFullYear();
    this.minStartDate = new Date();
    this.maxStartDate = new Date(currentYear + 1, 11, 31);
  }

  actualizarFecha(event: MatDatepickerInputEvent<Date>) {
    this.minEndDate = event.value;
    this.maxEndDate = new Date(event.value.getFullYear() + 1, 11, 31);
  }
  
  consultaFechas(form: NgForm) {
    this.checkIn = this.filtro.startDate;
    this.checkOut = this.filtro.endDate;
    this.nroPersonas = "1";     
    
    if(this.checkIn != undefined && this.checkOut != undefined){
      this.urlReservas = `/booking/${this.checkIn}/${this.checkOut}/${this.nroPersonas}`;
      this.router.navigate([this.urlReservas]);
    }
  }

  showErrorConexionMessage(){

  }

}