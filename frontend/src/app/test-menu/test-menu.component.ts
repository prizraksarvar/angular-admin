import {Component, Input, OnInit} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
} from '@angular/animations';
import {toggleMenuShowAnimation} from "../animations/toggle-menu-show.animation";

@Component({
    selector: 'app-test-menu',
    templateUrl: './test-menu.component.html',
    styleUrls: ['./test-menu.component.css'],
    animations: [toggleMenuShowAnimation]
})
export class TestMenuComponent implements OnInit {
    isOpen:boolean = false;
    items:string[] = [];

    constructor() {
        this.items = [];
        for(let i=0;i<10;i++ ) {
            this.items.push("Menu item "+i);
        }
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    ngOnInit() {
    }

}
