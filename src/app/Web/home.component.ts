import { Component, ElementRef, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "home-web",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeWebComponent implements OnInit{

    constructor(private translate: TranslateService){

    }
    
    loadAPI: Promise<any>
    setLanguage(lang: string){
        this.translate.use(lang);
    }
    ngOnInit() {
        this.loadAPI = new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        });
        }
        public loadScript() {        
            var isFound = false;
            var scripts = document.getElementsByTagName("script")
            for (var i = 0; i < scripts.length; ++i) {
                if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
                    isFound = true;
                }
            }
        
            if (!isFound) {
                var dynamicScripts = ["https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"];
        
                for (var i = 0; i < dynamicScripts.length; i++) {
                    let node = document.createElement('script');
                    node.src = dynamicScripts [i];
                    node.type = 'text/javascript';
                    node.async = false;
                    node.charset = 'utf-8';
                    document.getElementsByTagName('head')[0].appendChild(node);
                }
        
            }
        }

}