export class RespuestaTransaccion{
    constructor(
        public IdReserva?:string,
        public MensajeError?:string,
        public FechaPago?: string,
        public MontoPagado?: number,
        public Moneda?: string,
        public IdTransaccion?: string,
        public CodigoRef?: string,
        public CodigoReserva?: string,
        public TipoRespuesta?:number,
        public FechaCheckIn?: string,
        public FechaCheckOut?: string,

        public TipoTarjeta?:string,
        public NroTarjeta?:string,
        public MonedaCodigo?:string,
    ){}
}