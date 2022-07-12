import { Component, ElementRef, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "hotel-web",
    templateUrl: "./hotel.component.html",
    styleUrls: ["./hotel.component.css"]
})
export class HotelWebComponent{
    @Input() hotel:true;
    constructor(private translate: TranslateService){
    }
    setLanguage(lang: string){
        this.translate.use(lang);
    }

}
