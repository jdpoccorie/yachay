import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ConfigurationDataSource } from './configuration.datasource';
import { EmailData } from '../Model/email.model';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private http: HttpClient) { }

  obtenerCaptcha(): Observable<string>{
    return this.http.get<string>(ConfigurationDataSource.getInstance().baseUrl + `api/motor-reservas/generar-captcha`,
        {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
  }

    

    enviarCorreo(cuerpo: EmailData): Observable<any>{
        return this.http.post<any>(ConfigurationDataSource.getInstance().baseUrl + "api/motor-reservas/enviar-correo-electronico", cuerpo,
        {headers: ConfigurationDataSource.getInstance().getConfHeaders()});
    }
}
