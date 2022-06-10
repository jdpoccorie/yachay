import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "galeria-web",
    templateUrl: "./galeria.component.html",
    styleUrls: ["./galeria.component.css"]
})
export class GaleriaWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}