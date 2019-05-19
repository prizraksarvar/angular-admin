import {Directive, ElementRef, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorpColumnBodyHost]',
})
export class ColumnBodyDirective {
    constructor(public elementRef: ViewContainerRef) { }
}
