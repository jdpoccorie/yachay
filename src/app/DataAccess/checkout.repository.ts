import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkout } from '../Model/checkout.model';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';
import { TokensBotonWebVisaNet } from '../Model/tokens-boton-web-visanet.model';
import { ConfigurationDataSource } from './configuration.datasource';

@Injectable()
export class CheckOutRepository {

    constructor(private http: HttpClient) { }

    procesarCheckOut(checkOutMdl: checkout): Observable<RespuestaTransaccion>{
        return this.http.post<RespuestaTransaccion>(ConfigurationDataSource.getInstance().baseUrl + "api/motor-reservas/motor-reserva-checkout", checkOutMdl,
        {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
    }

    optenerTokensCheckOut(checkOutMdl: checkout): Observable<TokensBotonWebVisaNet>{
        return this.http.post<TokensBotonWebVisaNet>(ConfigurationDataSource.getInstance().baseUrl + "api/motor-reservas/motor-reserva-checkout-visa-net-tokens", checkOutMdl,
        {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
    }
}