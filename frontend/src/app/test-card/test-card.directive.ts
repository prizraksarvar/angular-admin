import {Directive, ElementRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[app-test-card-host]',
})
export class TestCardDirective {
    constructor(public el: ElementRef) { }
}