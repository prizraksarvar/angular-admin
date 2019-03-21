import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[app-core-field-viewer-host]',
})
export class CoreFieldViewerDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
