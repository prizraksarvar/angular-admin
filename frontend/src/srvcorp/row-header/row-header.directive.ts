import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorp-row-header-host]',
})
export class RowHeaderDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
