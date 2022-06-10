import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarritoDataSource } from '../DataAccess/carrito.datasource';
import { checkout } from '../Model/checkout.model';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';
import { SeleccionHabitacion } from '../Model/seleccion-habitacion.model';
import {MatDialog} from '@angular/material/dialog';
import { ProcessDialogComponent } from './process-dialog.component';
import { CheckOutRepository } from '../DataAccess/checkout.repository';
import { TokensBotonWebVisaNet } from '../Model/tokens-boton-web-visanet.model';
import { ConfigurationDataSource } from '../DataAccess/configuration.datasource';
//declare function openForm(_sessionToken:string, _merchantid:string, _purchasenumber:string, _amount:string, _action:string, _name:string, _lastName:string, _email:string, _cardNumber:string, _cardExpiry:string, _cardCvc:string): any;
//declare function loadCtrlForm(): any;

declare var payform: any;

@Component({
    selector: "CheckOut",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./checkout.component.css"]
})
export class CheckOutComponent {

    @ViewChild('collapseOne', {static: false}) collapseOneRef: ElementRef;
    @ViewChild('collapseTwo', {static: false}) collapseTwoRef: ElementRef;
    @ViewChild('resumenOrden', {static: false}) resumenOrdenRef: ElementRef;

    public formSubmitted: boolean = false;
    public checkOutModel : checkout;
    public formSubmittedTarjeta: boolean = false;
    public listaHabitacionesSeleccionadas: SeleccionHabitacion[] = [];
    public showLoadingSpinner: boolean = false;
    public numeroNoches: number;
    public moneda: string;
    public respuestaTokensVisaNet: TokensBotonWebVisaNet;
    public mostrarMensajeError: boolean = false;
    public mensajeError: string;

    cardNumber: any;
    cardExpiry : any;
    cardCvc : any;
    
    constructor(private checkOutRep: CheckOutRepository, public dialog: MatDialog){
        this.checkOutModel = CarritoDataSource.getInstance().checkOutObj;
        this.listaHabitacionesSeleccionadas = CarritoDataSource.getInstance().habitacionesSeleccionadas
        this.moneda = 'PEN';

        if(this.listaHabitacionesSeleccionadas.length > 0){
            this.moneda = this.listaHabitacionesSeleccionadas[0].Moneda;
        }    

        this.checkOutModel.monedaPago = this.moneda;

        var date1 = new Date(Date.parse(this.checkOutModel.startDate));
        var date2 = new Date(Date.parse(this.checkOutModel.endDate));
        

        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 

        // To calculate the no. of days between two dates 
        this.numeroNoches = Difference_In_Time / (1000 * 3600 * 24); 
    }

    processCheckOutDatosContacto(form: NgForm){       
        this.formSubmitted = true; 
        if(form.valid){ 

            this.collapseTwoRef.nativeElement.classList.add('show');
            this.collapseOneRef.nativeElement.classList.remove('show');

            this.checkOutModel.listaSeleccionHabitacion = this.listaHabitacionesSeleccionadas;
            CarritoDataSource.getInstance().checkOutObj = this.checkOutModel;
 
            this.showLoadingSpinner = true;
            this.checkOutRep.optenerTokensCheckOut(this.checkOutModel).subscribe(
             (data) => { 
                 this.respuestaTokensVisaNet = data;
                 CarritoDataSource.getInstance().checkOutObj.accessToken = this.respuestaTokensVisaNet.AccessToken;
                 CarritoDataSource.getInstance().checkOutObj.purchasenumber = this.respuestaTokensVisaNet.Purchasenumber;
                },
             error => {
                 this.showErrorConexionMessage();
             },
             () => {    
                            
                 if(this.respuestaTokensVisaNet.IsOk == true){                   
                    payform.setConfiguration(this.generarConfiguracion(this.respuestaTokensVisaNet.SessionToken, this.respuestaTokensVisaNet.Merchantid, this.respuestaTokensVisaNet.Purchasenumber, this.respuestaTokensVisaNet.Amount));
                    this.generarFormulario();
                }
                else{
                    this.showErrorGeneracionToken();
                }
                this.showLoadingSpinner = false;  
                
             });     
            this.formSubmitted = false;
        }
    }

    private generarConfiguracion(sesionKey: string, merchantId: string, purchaseNumber: string, amount: string) {
        return {
          'callback': '',
          'sessionkey': sesionKey,
          'channel': 'web',
          'merchantid': merchantId,
          'purchasenumber': purchaseNumber,
          'amount': amount,
          'language': 'es',
          'font': 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap'
        }
      }

    async processCheckOutPago(formPago: NgForm){
        this.formSubmittedTarjeta = true;
        if(formPago.valid){ 

            this.showLoadingSpinner = true;

            this.checkOutModel.listaSeleccionHabitacion = this.listaHabitacionesSeleccionadas;
            CarritoDataSource.getInstance().checkOutObj = this.checkOutModel;

            const data = {
                name: this.checkOutModel.nombres,
                lastName: this.checkOutModel.apellidos,
                email: this.checkOutModel.correoElectronico,
                alias: 'NCP'
              };
          
              try {
                const response = await payform.createToken([this.cardNumber,this.cardExpiry,this.cardCvc], data);
                CarritoDataSource.getInstance().checkOutObj.sessionToken = response['transactionToken'];                
              } catch(error) {
                console.log(error);
                this.mostrarMensajeError = true;
                this.mensajeError = error;
                this.showLoadingSpinner = false;
                return;
              }

            this.showLoadingSpinner = false;

            /*************************PAGO A TRAVEZ DE WEB SERVICES REST *******************************/
            this.resumenOrdenRef.nativeElement.classList.remove('sticky-top');

            let dialogRef = this.dialog.open(ProcessDialogComponent, {
                disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {
                this.resumenOrdenRef.nativeElement.classList.add('sticky-top');
            });
            
            this.formSubmittedTarjeta = false;
        }
    }

    private generarFormulario() {

        this.cardNumber = payform.createElement('card-number', {
            style: this.obtenerEstilos(), placeholder: 'Número de tarjeta'
          } , 'txtNumeroTarjeta');
    
        this.cardNumber.then(element => {
    
          // element.on('bin', function (data) {
          //   console.log('BIN: ', data);
          // });
    
          element.on('bin', (data) => {
            console.log('BIN: ', data);
          });
    
          element.on('change', function (data) {
            console.log('CHANGE: ', data);
          });
    
          element.on('dcc', function (data) {
            console.log('DCC: ', data);
          });
    
          element.on('installments', function (data) {
            console.log('INSTALLMENTS: ', data);
          });
    
          element.on('lastFourDigits', function (data) {
            console.log('LAST 4 DIGITS: ', data);
          });
    
        });
    
        this.cardExpiry = payform.createElement('card-expiry', {
            style: this.obtenerEstilos(), placeholder: 'MM/YY'
          }, 'txtFechaVencimiento');
    
        this.cardExpiry.then(element => {
          element.on('change', function (data) {
            console.log('CHANGE: ', data);
          });
    
        });
    
        this.cardCvc = payform.createElement('card-cvc', {
            style: this.obtenerEstilos(), placeholder: 'CVC'
          }, 'txtCvv');
    
        this.cardCvc.then(element => {
          element.on('change', function (data) {
            console.log('CHANGE: ', data);
          });
    
        });
    
    }

    private obtenerEstilos() {
        return {
          'base': {
            'color': '#666666',
            'fontWeight': 700,
            'fontFamily': "'Montserrat', sans-serif",
            'fontSize': '16px',
            'fontSmoothing': 'antialiased',
            'placeholder': {
              'color': '#999999',
            },
            'autofill': {
              'color': '#e39f48',
            },
          },
          'invalid': {
            'color': '#E25950',
            '::placeholder': {
              'color': '#FFCCA5',
            },
          },
        }
    }

    showErrorConexionMessage(){

    }

    showErrorGeneracionToken(){

    }

    volverFormContacto(){
        this.collapseTwoRef.nativeElement.classList.remove('show');
        this.collapseOneRef.nativeElement.classList.add('show');
    }
}