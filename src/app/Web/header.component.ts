import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";


@Component({
    selector: "header-web",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderWebComponent implements OnInit{

    @Input() hotel:boolean;
    @Input() inicio:boolean;
    @Input() restaurante:boolean;

    @Output() dataEvent = new EventEmitter();

    constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document){

    }

    loadAPI: Promise<any>

    setLanguage(lang: string){
        this.translate.use(lang);
        this.dataEvent.emit(lang);
    }

    home(){
        this.document.location.href = '/#/home';
        //window.location.reload();
    }

    // aboutus(){
    //     this.document.location.href = '/#/aboutus';
    //     //window.location.reload();
    // }

    // rooms(){
    //     this.document.location.href = '/#/rooms';
    //     //window.location.reload();
    // }

    // gallery(){
    //     this.document.location.href = '/#/gallery';
    //     //window.location.reload();
    // }

    // contact(){
    //     this.document.location.href = '/#/contact';
    //     //window.location.reload();
    // }

    ngOnInit(): void {

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
          var dynamicScripts = [""];
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
