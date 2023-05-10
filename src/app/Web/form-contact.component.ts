import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { EmailService } from '../DataAccess/email.service';
import { EmailData } from '../Model/email.model';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit {
  @Input () hotel: string;

  capcha64: SafeResourceUrl;
  public showLoadingSpinner: boolean = false;
  public EnvioSuccess: boolean = false;
  public EnvioFailed: boolean = false;

  datos!:FormGroup;

  constructor(private translate: TranslateService, private genCaptcha:EmailService, private domSanitizer:DomSanitizer, private sendMail:EmailService) {
    this.crearFormulario()
    this.procesarConsulta()
  }

  ngOnInit(): void {
  }

  setLanguage(lang: string){
    this.translate.use(lang);
  }

  crearFormulario() {
    this.datos = new FormGroup({
      // CorreoEmisor: new FormControl('',[Validators.required, Validators.pattern("[az0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")], ),
      CorreoEmisor: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")], ),
      NombreEmisor: new FormControl('',[Validators.required],),
      OtrosDatos: new FormControl('',[Validators.required],),
      CuerpoMensaje: new FormControl('',[Validators.required],),
      CodigoCaptcha: new FormControl('',[Validators.required],)
    })
  }

  limpiarFormulario() {
    this.datos.reset()
  }

  get NombreEmisorNoValido() {
    return this.datos.get('NombreEmisor')?.invalid && (this.datos.get('NombreEmisor')?.touched || this.datos.get('NombreEmisor')?.dirty)
  }
  get CorreoEmisorNoValido() {
    return this.datos.get('CorreoEmisor')?.invalid && (this.datos.get('CorreoEmisor')?.touched)
  }
  get OtrosDatosNoValido() {
    return this.datos.get('OtrosDatos')?.invalid && (this.datos.get('OtrosDatos')?.touched || this.datos.get('OtrosDatos')?.dirty)
  }
  get CuerpoMensajeNoValido() {
    return this.datos.get('CuerpoMensaje')?.invalid && (this.datos.get('CuerpoMensaje')?.touched || this.datos.get('CuerpoMensaje')?.dirty)
  }
  get CodigoCaptchaNoValido() {
    return this.datos.get('CodigoCaptcha')?.invalid && (this.datos.get('CodigoCaptcha')?.touched || this.datos.get('CodigoCaptcha')?.dirty)
  }

  enviarCorreo() {
    let cuerpo = new EmailData();
    cuerpo = this.datos.value

    if (this.datos.valid) {
      this.sendMail.enviarCorreo(cuerpo).subscribe(
          (data) => { 
            console.log('Correo Enviado a MachuPicchu') 
            this.EnvioSuccess = true;
            this.limpiarFormulario()
            this.procesarConsulta()
          },
          error => {
            this.EnvioFailed = true;
            console.log(error)
          },
          () => { 
          
          }); 
      } else {
          console.log('datos invalidos')
          Object.values(this.datos.controls).forEach(control => {
              control.markAllAsTouched()
          })
      }
  }

  procesarConsulta() {
    this.showLoadingSpinner = true;
    this.genCaptcha.obtenerCaptcha().subscribe(
    data => {
      
      this.capcha64 = this.domSanitizer.bypassSecurityTrustResourceUrl("data:image/bmd;base64, " + data);

      console.log(this.capcha64)
    },
    error => {
      this.showErrorConexionMessage();
    }, () => {                 
      this.showLoadingSpinner = false;                              
    });
  }

  showErrorConexionMessage(){

  }

  refreshCaptcha() {
    this.procesarConsulta()
  }

  cerrarMensaje() {
    setTimeout(() => {
    }, 1000);
    this.EnvioSuccess = false;
    this.EnvioFailed = false;
  }

}
