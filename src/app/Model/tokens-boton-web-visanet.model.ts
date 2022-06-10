export class TokensBotonWebVisaNet{
    constructor(
        public AccessToken?:string,
        public SessionToken?:string,
        public Merchantid?:string,
        public Purchasenumber?:string,
        public Amount?:string,
        public IsOk?:boolean,
        public TipoRespuesta?:number,
        public MensajeError?:string,
    ){ }
}