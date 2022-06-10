import { SeleccionHabitacion } from './seleccion-habitacion.model';

export class checkout{
    constructor(
        public tipoDocIdentidad?:string,
        public numeroDocIdentidad?:string,
        public nombres?:string,
        public apellidos?:string,
        public telefonoContacto?:string,
        public correoElectronico?:string,
        public direccionExacta?:string,
        public pais?:string, 
        public ciudad?:string, 

        public startDate?:string,
        public endDate?:string,
        public listaSeleccionHabitacion?: SeleccionHabitacion[],  

        public formaPago?:number,
        public montoPago?:number,
        public monedaPago?:string,
        public numeroTarjeta?:string,
        public fechaExpTarjeta?:string,
        public cvvTarjeta?:string,
        public clientIP?:string,

        public sessionToken?:string,
        public purchasenumber?:string,
        public accessToken?:string
    ){}
}