import {Directive, ElementRef, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[srvcorpHeader]',
})
export class HeaderDirective {
    constructor(public elementRef: TemplateRef<any>) { }
}
