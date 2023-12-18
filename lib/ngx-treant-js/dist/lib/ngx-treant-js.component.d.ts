import { AfterViewInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library
 * for visualization of tree (chart) diagrams, with additional functionality.
 */
export declare class NgxTreantJsComponent implements AfterViewInit {
    chartId: string;
    chartClass: string;
    data: any;
    popoverSettings: any;
    mouseleaveMilliseconds: number;
    isDraggable: boolean;
    textProps: any;
    clicked: EventEmitter<any>;
    hovered: EventEmitter<any>;
    dragged: EventEmitter<any>;
    dropped: EventEmitter<any>;
    updated: EventEmitter<any>;
    loadedNodes: EventEmitter<any>;
    loadedTreant: EventEmitter<any>;
    loadedTree: EventEmitter<any>;
    constructor();
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxTreantJsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxTreantJsComponent, "ngx-treant-chart", never, { "chartId": { "alias": "chartId"; "required": false; }; "chartClass": { "alias": "chartClass"; "required": false; }; "data": { "alias": "data"; "required": false; }; "popoverSettings": { "alias": "popoverSettings"; "required": false; }; "mouseleaveMilliseconds": { "alias": "mouseleaveMilliseconds"; "required": false; }; "isDraggable": { "alias": "isDraggable"; "required": false; }; "textProps": { "alias": "textProps"; "required": false; }; }, { "clicked": "clicked"; "hovered": "hovered"; "dragged": "dragged"; "dropped": "dropped"; "updated": "updated"; "loadedNodes": "loadedNodes"; "loadedTreant": "loadedTreant"; "loadedTree": "loadedTree"; }, never, never, false, never>;
}
