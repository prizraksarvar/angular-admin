import {Directive, ElementRef, TemplateRef, ViewContainerRef} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";

@Directive({
    selector: '[srvcorpCell]',
})
export class CellDirective {
    constructor(public elementRef: TemplateRef<any>) { }
}
