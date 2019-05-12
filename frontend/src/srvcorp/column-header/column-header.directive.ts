import {Directive, ElementRef, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorpColumnHeaderHost]',
})
export class ColumnHeaderDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
