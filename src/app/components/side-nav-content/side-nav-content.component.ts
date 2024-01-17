import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  navItems = [
    { label: 'كيف يعمل الأرشيف', route: '/كيف-يعمل', icon: "assets/pix/question_exchange.png"},
    { label: 'اتصل بنا', route: '/اتصل-بنا', icon: "assets/pix/mail.png"},
    { label: 'مصدر المشروع', url: 'https://github.com/Quran-Labs/quran.team', icon: "assets/pix/icons8-github-48.png"}
    
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getAppVersion(){
    return packageJson.version;
  }
  onNavigationSelection(navItem: any) {
    if(navItem.url){
      (window as any).open(navItem.url, "_blank");
    } else {
      this.router.navigate([navItem.route]);
    }
  }

}
