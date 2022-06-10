import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { CarritoDataSource } from "./DataAccess/carrito.datasource";
import { ConfigurationDataSource } from './DataAccess/configuration.dataSource';
import { SeleccionHabitacion } from "./Model/seleccion-habitacion.model";

@Injectable()
export class StoreFirstGuard {
    private firstNavigation = true;
    public listaHabitacionesSeleccionadas: SeleccionHabitacion[] = [];
    
    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        this.listaHabitacionesSeleccionadas = CarritoDataSource.getInstance().habitacionesSeleccionadas

        if(this.listaHabitacionesSeleccionadas.length > 0){
            return true;
        }    
        this.router.navigateByUrl("/home");
        return false;
    }
}