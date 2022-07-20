import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "agencia-web",
    templateUrl: "./agencia.component.html",
    styleUrls: ["./agencia.component.css"]
})
export class AgenciaWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
