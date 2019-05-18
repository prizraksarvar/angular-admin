import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorpTableBodyHost]',
})
export class TableBodyDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
