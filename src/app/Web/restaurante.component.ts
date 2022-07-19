import { Component, ElementRef, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "restaurante-web",
    templateUrl: "./restaurante.component.html",
    styleUrls: ["./restaurante.component.css"]
})
export class RestauranteWebComponent {
    @Input() restaurante:true;
    
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
