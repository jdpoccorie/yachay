import { Component, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'hotel-web',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelWebComponent implements OnInit, OnDestroy {
  @Input() hotel: true;
  particles: any;
  constructor(private translate: TranslateService) {}
  // loadAPI: Promise<any>;
  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit() {
    // this.loadAPI = new Promise((resolve) => {
    //   this.loadScript();
    //   resolve(true);
    // });
  }
  ngOnDestroy(): void {

  }
//   public loadScript() {
//     var isFound = false;
//     var scripts = document.getElementsByTagName('script');
//     for (var i = 0; i < scripts.length; ++i) {
//       if (
//         scripts[i].getAttribute('src') != null &&
//         scripts[i].getAttribute('src').includes('loader')
//       ) {
//         isFound = true;
//       }
//     }

//     if (!isFound) {
//       var dynamicScripts = [
//         'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js',
//       ];
//       for (var i = 0; i < dynamicScripts.length; i++) {
//         let node = document.createElement('script');
//         node.src = dynamicScripts[i];
//         node.type = 'text/javascript';
//         node.async = false;
//         node.charset = 'utf-8';
//         document.getElementsByTagName('head')[0].appendChild(node);
//       }
//     }
//   }
}
