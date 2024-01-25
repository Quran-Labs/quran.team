import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
      private navService: NavigationService,
      private elementRef:ElementRef
      ) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "//cdn.jsdelivr.net/npm/share-buttons/dist/share-buttons.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }

}
