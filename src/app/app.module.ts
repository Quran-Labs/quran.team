import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TreeComponent } from './components/tree/tree.component';
import { NgxTreantJsModule } from '@ahmed757/ngx-treant-js';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { OperationsPageComponent } from './pages/operations-page/operations-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DateValidatorDirective } from './directives/date-validator.directive';
import { UploadButtonComponent } from './components/header-content/upload-button/upload-button.component';

@NgModule({
    declarations: [
        AppComponent, 
        TreeComponent,
        HeaderComponent,
        SideNavContentComponent,    
        SideNavComponent,
        OperationsPageComponent,
        ContactPageComponent,
        DateValidatorDirective,
        UploadButtonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxTreantJsModule,
        ReactiveFormsModule,
        NgScrollbarModule,
        ModalModule.forRoot(),
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private sanitizer: DomSanitizer) {}
}
