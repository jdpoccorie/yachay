import { Component, ElementRef, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as $ from 'jquery';

@Component({
    selector: "galeria-web",
    templateUrl: "./galeria.component.html",
    styleUrls: ["./galeria.component.css"]
})
export class GaleriaWebComponent implements OnInit{
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

    ngOnInit(): void {

    }
}
