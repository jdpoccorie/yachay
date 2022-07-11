import { Component, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "hotel-web",
    templateUrl: "./hotel.component.html",
    styleUrls: ["./hotel.component.css"]
})
export class HotelWebComponent {
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
