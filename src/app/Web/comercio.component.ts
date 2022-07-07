import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "comercio-web",
    templateUrl: "./comercio.component.html",
    styleUrls: ["./comercio.component.css"]
})
export class ComercioWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
