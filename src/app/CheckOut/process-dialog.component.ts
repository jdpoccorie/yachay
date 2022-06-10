import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoDataSource } from '../DataAccess/carrito.datasource';
import { CheckOutRepository } from '../DataAccess/checkout.repository';
import { RespuestaTransaccion } from '../Model/respuesta-transaccion.model';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'process-dialog',
    templateUrl: './process-dialog.component.html'
  })
  export class ProcessDialogComponent {
      
    public showLoadingSpinner: boolean = true;
    public isOk : boolean = false;
    public respuestaCheckOut: RespuestaTransaccion;

    constructor(private checkOutRep: CheckOutRepository, private router: Router, @Inject(DOCUMENT) private document: Document){
        this.respuestaCheckOut = new RespuestaTransaccion();
        this.procesarCheckOut();
    }

    procesarCheckOut(){             
            this.showLoadingSpinner = true;
            var checkOutModel = CarritoDataSource.getInstance().checkOutObj;

            this.checkOutRep.procesarCheckOut(checkOutModel).subscribe(
                (data) => { this.respuestaCheckOut = data; },
                error => {
                    this.showErrorConexionMessage();
                },
                () => { 
                this.showLoadingSpinner = false;
    
                if(this.respuestaCheckOut.TipoRespuesta == 0){
                    this.isOk = true;
                    CarritoDataSource.getInstance().respuestaServer = this.respuestaCheckOut;
                }      
                else{
                    this.isOk = false;
                }
            });            
    }

    showErrorConexionMessage(){

    }

    generarOrden(){
        this.router.navigateByUrl("/orden-detail");
    }

    postback(){
        this.document.location.href = '/';
    }

  }