import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  OnInit,
  Query,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'header-web',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderWebComponent implements OnInit {
  @Input() hotel: boolean;
  @Input() inicio: boolean;
  @Input() restaurante: boolean;

  @Output() dataEvent = new EventEmitter();
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // loadAPI: Promise<any>

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.dataEvent.emit(lang);
  }

  home() {
    this.document.location.href = '/#/home';
    //window.location.reload();
  }
  movePage(el: HTMLElement){

    if (this.homePage){

    }
    else{
        el.scrollIntoView();
    }
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

  contact(){
      this.document.location.href = '/#/contact';
      console.log("vista de contacto");
      //window.location.reload();
  }

  ngOnInit(): void {
    $('.actions .menu-toggle').on('click', function () {
      $('.actions .menu-toggle, .main-menu').toggleClass('active');
    });

    /*
     * Searcher behavior
     */
    $('.main-search button').on('click', function (e) {
      $(this).toggleClass('active');
      $('.main-search .searcher').toggleClass('active');
    });

    $('.main-search .searcher button').on('click', function () {
      $('.main-search button, .main-search .searcher').removeClass('active');
    });

    //   this.loadAPI = new Promise((resolve) => {
    //     this.loadScript();
    //     resolve(true);
    // });
  }

  //   public loadScript() {
  //     var isFound = false;
  //     var scripts = document.getElementsByTagName("script")
  //     for (var i = 0; i < scripts.length; ++i) {
  //         if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
  //             isFound = true;
  //         }
  //     }

  //     if (!isFound) {
  //         var dynamicScripts = ["https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js"];
  //         for (var i = 0; i < dynamicScripts.length; i++) {
  //             let node = document.createElement('script');
  //             node.src = dynamicScripts [i];
  //             node.type = 'text/javascript';
  //             node.async = false;
  //             node.charset = 'utf-8';
  //             document.getElementsByTagName('head')[0].appendChild(node);
  //         }

  //     }
  // }
}
