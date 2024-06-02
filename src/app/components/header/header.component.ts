import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() headerTemplateRef: any;

  constructor( private navService: NavigationService ,
    private treeService: TreeService ) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }

}
