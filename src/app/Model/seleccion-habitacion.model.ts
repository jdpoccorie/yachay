export class SeleccionHabitacion{
    constructor(
        public IdTipoHabitacion?:boolean,
        public TipoHabitacion?:string,
        public Capacidad?:number,
        public PrecioXNoche?:number,
        public PrecioSubTotal?:number,        
        public Moneda?:string,
        public nroNoches?: number,

        public Base64ImageBanner1?:string,
        public Base64ImageBanner2?:string,
        public Base64ImageBanner3?:string,
    ){ }
}