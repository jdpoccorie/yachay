import { PrecioVenta } from './precio-venta.model';

export class TipoHabitacion{
    constructor(
        public IdTipoHabitacion?:boolean,
        public TipoHabitacion?:string,
        public Observaciones?:string,
        public Capacidad?:number,
        public PrecioXNoche?:number,
        public Moneda?:string,
        public Estado?:boolean,        
        public Base64ImageBanner1?:string,
        public Base64ImageBanner2?:string,
        public Base64ImageBanner3?:string,
        public estadoImagen: number = 0,
        public ListaPreciosVentaXNoche?: PrecioVenta[]      
    ){ }
}