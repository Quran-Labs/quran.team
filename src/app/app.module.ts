import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BasicPopoverComponent } from './demo-charts/basic-popover/basic-popover.component';
import { NgxTreantJsModule } from '@ahmed757/ngx-treant-js';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, BasicPopoverComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxTreantJsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
