import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "movil-web",
    templateUrl: "./movil.component.html",
    styleUrls: ["./movil.component.css"]
})
export class MovilWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
