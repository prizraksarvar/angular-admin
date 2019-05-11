import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorp-table-header-host]',
})
export class TableHeaderDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
