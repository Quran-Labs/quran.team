import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ["../../app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
