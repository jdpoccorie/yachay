export class EmailData{
    constructor(
        public CorreoEmisor?:string,
        public CuerpoMensaje?:string,
        public NombreEmisor?:string,
        public OtrosDatos?:string,
        public CodigoCaptcha?:string,
    ){ }
}