import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TestCardDirective} from "./test-card.directive";
import {Testitem} from "../test-list/testitem";

@Component({
    selector: 'app-test-card',
    templateUrl: './test-card.component.html',
    styleUrls: ['./test-card.component.css']
})
export class TestCardComponent implements OnInit {
    @Input() item: Testitem;
    @Input() top: number;
    @Input() listener: CallableFunction;
    @ViewChild(TestCardDirective) adHost: TestCardDirective;

    constructor() {

    }

    ngOnInit() {
        //debugger;
        let viewContainerRef = this.adHost.el;
        console.log(viewContainerRef);
        //viewContainerRef.nativeElement.style.position = 'absolute';
        viewContainerRef.nativeElement.style.left = ''+3+'px';
        viewContainerRef.nativeElement.style.top = ''+this.top+'px';
        //viewContainerRef.nativeElement.style.boxShadow = 'black 0px 0px 7px -2px';
    }

    closeClick() {
        this.listener();
    }
}
