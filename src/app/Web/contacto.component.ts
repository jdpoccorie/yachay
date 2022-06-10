import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "contacto-web",
    templateUrl: "./contacto.component.html",
    styleUrls: ["./contacto.component.css"]
})
export class ContactoWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}