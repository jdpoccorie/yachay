import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TipoHabitacion } from '../Model/tipo-habitacion.model';
import { ConfigurationDataSource } from './configuration.datasource';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';
import { HabitacionesSeleccionadas } from '../Model/habitaciones-selecionadas.model';

@Injectable()
export class HabitacionesRepository {

    constructor(private http: HttpClient) { }

    cargarConsultaHabitaciones(nroPersonas:number): Observable<TipoHabitacion[]>{
        return this.http.get<TipoHabitacion[]>(ConfigurationDataSource.getInstance().baseUrl + `api/motor-reservas/tipo-habitacion/${nroPersonas}`,
            {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
    } 

    cargarConsultaHabitacionesPorFecha(nroPersonas:number, checkIn:string): Observable<TipoHabitacion[]>{
        return this.http.get<TipoHabitacion[]>(ConfigurationDataSource.getInstance().baseUrl + `api/motor-reservas/tipo-habitacion-v2/${nroPersonas}/${checkIn}`,
            {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
    } 

    verificarDisponibilidad(checkOutMdl: HabitacionesSeleccionadas): Observable<RespuestaTransaccion>{
        return this.http.post<RespuestaTransaccion>(ConfigurationDataSource.getInstance().baseUrl + "api/motor-reservas/verificar-disponibilidad", checkOutMdl,
        {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
    }
}