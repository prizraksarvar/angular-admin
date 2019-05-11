import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorp-row-host]',
})
export class RowDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
