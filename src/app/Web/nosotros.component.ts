import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "nosotros-web",
    templateUrl: "./nosotros.component.html",
    styleUrls: ["./nosotros.component.css"]
})
export class NosotrosWebComponent {

    constructor(private translate: TranslateService){

    }

    setLanguage(lang: string){
        this.translate.use(lang);
    }

}