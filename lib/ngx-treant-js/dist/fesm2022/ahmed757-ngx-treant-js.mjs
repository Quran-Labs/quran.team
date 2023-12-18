import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';

/**
 * A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library
 * for visualization of tree (chart) diagrams, with additional functionality.
 */
class NgxTreantJsComponent {
    constructor() {
        this.clicked = new EventEmitter();
        this.hovered = new EventEmitter();
        this.dragged = new EventEmitter();
        this.dropped = new EventEmitter();
        this.updated = new EventEmitter();
        this.loadedNodes = new EventEmitter();
        this.loadedTreant = new EventEmitter();
        this.loadedTree = new EventEmitter();
    }
    ngAfterViewInit() {
        const callback = (callback) => {
            let popoverElm1;
            let popoverElm2;
            let timeout;
            let draggedNode;
            let droppedNode;
            const __this = this;
            // add ids to nodeDOMs
            for (let i = 0; i < callback.nodeDB.db.length; i++) {
                callback.nodeDB.db[i].nodeDOM.id = callback.nodeDB.db[i].id;
            }
            this.loadedTree.emit(callback);
            const $oNodes = $(`#${this.chartId} .node`);
            // add support for drag and drop functionality
            const addDragAndDropSupport = () => {
                for (let i = 0; i < $oNodes.length; i++) {
                    $oNodes[i].draggable = true;
                    $oNodes[i].classList.add('drop');
                    $oNodes[i].addEventListener('dragstart', drag, false);
                    $oNodes[i].addEventListener('drop', drop, false);
                    $oNodes[i].addEventListener('dragover', allowDrop, false);
                }
            };
            // swap nodes after drag and drop
            function swapNodes(nodes, dragIndex, dropIndex) {
                const temp = nodes[dragIndex];
                const dragClone = { ...temp };
                const dropClone = { ...nodes[dropIndex] };
                nodes[dragIndex] = nodes[dropIndex];
                nodes[dropIndex] = temp;
                // set dragged node props
                nodes[dragIndex].id = dragClone.id;
                nodes[dragIndex].nodeDOM.id = dragClone.id;
                nodes[dragIndex].parentId = dragClone.parentId;
                nodes[dragIndex].children = dragClone.children;
                nodes[dragIndex].connStyle = dragClone.connStyle;
                nodes[dragIndex].stackChildren = dragClone.stackChildren;
                nodes[dragIndex].stackParentId = dragClone.stackParentId;
                nodes[dragIndex].stackParent = dragClone.stackParent;
                nodes[dragIndex].leftNeighborId = dragClone.leftNeighborId;
                nodes[dragIndex].rightNeighborId = dragClone.rightNeighborId;
                nodes[dragIndex].collapsed = dragClone.collapsed;
                nodes[dragIndex].collapsable = dragClone.collapsable;
                // set dropped node props
                nodes[dropIndex].id = dropClone.id;
                nodes[dropIndex].nodeDOM.id = dropClone.id;
                nodes[dropIndex].parentId = dropClone.parentId;
                nodes[dropIndex].children = dropClone.children;
                nodes[dropIndex].connStyle = dropClone.connStyle;
                nodes[dropIndex].stackChildren = dropClone.stackChildren;
                nodes[dropIndex].stackParent = dropClone.stackParent;
                nodes[dropIndex].stackParentId = dropClone.stackParentId;
                nodes[dropIndex].leftNeighborId = dropClone.leftNeighborId;
                nodes[dropIndex].rightNeighborId = dropClone.rightNeighborId;
                nodes[dropIndex].collapsed = dropClone.collapsed;
                nodes[dropIndex].collapsable = dropClone.collapsable;
            }
            function hidePopover() {
                $(popoverElm1).popover('hide');
                $(popoverElm2).popover('hide');
            }
            function drag(event) {
                draggedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                hidePopover();
                __this.dragged.emit({ draggedNode, $ });
            }
            function drop(event) {
                event.preventDefault();
                droppedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                hidePopover();
                __this.dropped.emit({ draggedNode: droppedNode, droppedNode: draggedNode, $ });
                const dragIndex = callback.nodeDB.db.findIndex((n) => n.id == draggedNode.id);
                const dropIndex = callback.nodeDB.db.findIndex((n) => n.id == droppedNode.id);
                swapNodes(callback.nodeDB.db, dragIndex, dropIndex);
                callback.positionTree();
            }
            function allowDrop(event) {
                event.preventDefault();
            }
            function updateTextVal(currentEle, value, classVal, node, propName) {
                let isTextUpdated = false;
                $(document).off('click');
                $(currentEle).html('<input class="input-field" style="width:' +
                    $(currentEle).width() +
                    'px;" type="text" value="' +
                    value +
                    '"/>');
                $('.input-field').focus();
                $('.input-field').keyup(function (event) {
                    if (event.keyCode === 13) {
                        const inputClass = $(event.target).attr('class');
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        if (inputClass === 'input-field') {
                            isTextUpdated = true;
                        }
                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }
                        callback.positionTree();
                        __this.updated.emit({ node, $ });
                    }
                });
                $(document).click(function () {
                    if ($(event.target).attr('class') !== 'input-field' && !isTextUpdated) {
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        $(document).off('click');
                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }
                        callback.positionTree();
                        __this.updated.emit({ node, $ });
                    }
                });
            }
            this.isDraggable && addDragAndDropSupport();
            $oNodes.off('click').on('click', function (event) {
                const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                hidePopover();
                __this.clicked.emit({ node, $ });
            });
            $oNodes.off('dblclick').on('dblclick', function (e) {
                if ($(event.target).attr('class') !== 'input-field') {
                    e.stopPropagation();
                    const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                    const currentEle = $(event.target);
                    const value = $(event.target).text();
                    const classVal = $(event.target).attr('class');
                    const propName = classVal && classVal.split('-')[1];
                    hidePopover();
                    node.text &&
                        node.text[propName] &&
                        updateTextVal(currentEle, value, classVal, node, propName);
                }
            });
            if (this.popoverSettings) {
                $oNodes.popover(this.popoverSettings);
                $oNodes
                    .off('mouseenter')
                    .on('mouseenter', function (e) {
                    hidePopover();
                    popoverElm1 = this;
                    $(this).popover('show');
                    const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                    __this.hovered.emit({ node, $ });
                    clearTimeout(timeout);
                    $('.popover')
                        .off('mouseleave')
                        .on('mouseleave', function () {
                        hidePopover();
                    });
                })
                    .off('mouseleave')
                    .on('mouseleave', function (e) {
                    let hovered = false;
                    popoverElm2 = this;
                    $('.popover').hover(function () {
                        hovered = true;
                    }, function () {
                        hovered = false;
                    });
                    if (!$('.popover:hover').length) {
                        timeout = setTimeout(() => {
                            !hovered && hidePopover();
                        }, __this.mouseleaveMilliseconds || 0);
                    }
                });
            }
            // emit Tree nodes
            this.loadedNodes.emit({ nodes: callback.nodeDB.db, $ });
        };
        // create Treant instance and add its container ID
        // this instance can be useful to operate on the Tree
        const treant = new Treant(this.data, callback, $);
        treant.container_id = this.chartId;
        this.loadedTreant.emit(treant);
    }
    static { this.ɵfac = function NgxTreantJsComponent_Factory(t) { return new (t || NgxTreantJsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgxTreantJsComponent, selectors: [["ngx-treant-chart"]], inputs: { chartId: "chartId", chartClass: "chartClass", data: "data", popoverSettings: "popoverSettings", mouseleaveMilliseconds: "mouseleaveMilliseconds", isDraggable: "isDraggable", textProps: "textProps" }, outputs: { clicked: "clicked", hovered: "hovered", dragged: "dragged", dropped: "dropped", updated: "updated", loadedNodes: "loadedNodes", loadedTreant: "loadedTreant", loadedTree: "loadedTree" }, decls: 1, vars: 2, consts: [[3, "className", "id"]], template: function NgxTreantJsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("className", ctx.chartClass)("id", ctx.chartId);
        } }, encapsulation: 2 }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxTreantJsComponent, [{
        type: Component,
        args: [{ selector: 'ngx-treant-chart', template: "<div [className]=\"chartClass\" [id]=\"chartId\"></div>\n" }]
    }], function () { return []; }, { chartId: [{
            type: Input
        }], chartClass: [{
            type: Input
        }], data: [{
            type: Input
        }], popoverSettings: [{
            type: Input
        }], mouseleaveMilliseconds: [{
            type: Input
        }], isDraggable: [{
            type: Input
        }], textProps: [{
            type: Input
        }], clicked: [{
            type: Output
        }], hovered: [{
            type: Output
        }], dragged: [{
            type: Output
        }], dropped: [{
            type: Output
        }], updated: [{
            type: Output
        }], loadedNodes: [{
            type: Output
        }], loadedTreant: [{
            type: Output
        }], loadedTree: [{
            type: Output
        }] }); })();

class NgxTreantJsModule {
    static { this.ɵfac = function NgxTreantJsModule_Factory(t) { return new (t || NgxTreantJsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxTreantJsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxTreantJsModule, [{
        type: NgModule,
        args: [{
                declarations: [NgxTreantJsComponent],
                imports: [],
                exports: [NgxTreantJsComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxTreantJsModule, { declarations: [NgxTreantJsComponent], exports: [NgxTreantJsComponent] }); })();

/*
 * Public API Surface of ngx-treant-js
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxTreantJsComponent, NgxTreantJsModule };
//# sourceMappingURL=ahmed757-ngx-treant-js.mjs.map
