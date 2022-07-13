import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "sistema-web",
    templateUrl: "./sistema.component.html",
    styleUrls: ["./sistema.component.css"]
})
export class SistemaWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
