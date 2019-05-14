import {Component, Input, OnInit} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
} from '@angular/animations';
import {Testitem} from "./testitem";

@Component({
    selector: 'app-test-list',
    templateUrl: './test-list.component.html',
    styleUrls: ['./test-list.component.css'],
    animations: [
        trigger('hoverToggle', [
            // ...
            state('notHover', style({
                backgroundColor: 'white'
            })),
            state('hover', style({
                backgroundColor: '#ededed'
            })),
            transition('notHover => hover', [
                animate('0.3s')
            ]),
            transition('hover => notHover', [
                animate('0.3s')
            ]),
        ]),
    ]
})
export class TestListComponent implements OnInit {
    items: Testitem[];
    @Input()
    listener: CallableFunction;

    isOpen = true;

    hoverToggle(item:Testitem) {
        item.isHover = !item.isHover;
    }

    constructor() {
        this.items = [];
        let it = new Testitem();
        for(let i=0;i<10;i++ ) {
            it = new Testitem();
            it.id = i;
            it.name = 'test'+i;
            it.cat = 'cat'+i;
            it.add = 'add'+i;
            it.image='avatar-neytiri.jpg';
            it.isHover = false;
            this.items.push(it);
        }
    }

    itemClick($event: any, item:Testitem) {
        this.listener(item,$event.target.offsetTop);
    }

    ngOnInit() {
    }

}
