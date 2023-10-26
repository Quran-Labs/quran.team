import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BasicPopoverComponent } from './demo-charts/basic-popover/basic-popover.component';
import { HomeChartsComponent } from './demo-charts/home/home-charts.component';
import { NgxTreantJsModule } from '@ahmed757/ngx-treant-js';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        AppComponent,
        BasicPopoverComponent,
        HomeChartsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxTreantJsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
