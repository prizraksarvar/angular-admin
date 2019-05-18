import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorpTableHeaderHost]',
})
export class TableHeaderDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
