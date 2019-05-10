import {Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, Type} from '@angular/core';
import {CoreField} from "./core-field";
import {CoreFieldView} from "./core-field-view";
import { Directive, ViewContainerRef } from '@angular/core';
import {CoreFieldViewerDirective} from "./core-field-viewer.directive";


@Component({
    selector: 'app-core-field-viewer',
    template: `
        <ng-template app-core-field-viewer-host></ng-template>
            `
})
export class CoreFieldViewerComponent implements OnInit, OnDestroy {
    @Input() field: CoreField;
    @Input() value: any;
    @Input() viewType: Type<any>;
    @ViewChild(CoreFieldViewerDirective) adHost: CoreFieldViewerDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnDestroy() {

    }

    loadComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.viewType);

        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<CoreFieldView>componentRef.instance).field = this.field;
        (<CoreFieldView>componentRef.instance).value = this.value;
    }
}
