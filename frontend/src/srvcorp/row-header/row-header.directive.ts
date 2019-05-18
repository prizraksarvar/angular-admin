import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorpRowHeaderHost]',
})
export class RowHeaderDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
