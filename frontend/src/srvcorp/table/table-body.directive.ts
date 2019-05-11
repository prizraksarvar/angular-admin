import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorp-table-body-host]',
})
export class TableBodyDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
