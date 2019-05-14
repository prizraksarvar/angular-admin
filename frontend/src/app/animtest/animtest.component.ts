import {Component, OnInit} from '@angular/core';
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";
import {animtestToggleListItemShowAnimation} from "../animations/animtest-toggle-list-item-show.animation";

@Component({
    selector: 'app-pages-animtest',
    templateUrl: './animtest.component.html',
    styleUrls: ['./animtest.component.css'],
    animations: [
        animtestToggleListItemShowAnimation,
    ]
})
export class AnimtestComponent implements OnInit {
    title: string = "animtest";
    viewTypeSwitch: boolean = false;
    item: number[];
    itemTop: number;
    pageYOffset: number = 0;
    pageHeight: number = 0;

    constructor() {
        console.log('constructor animtest');
        this.listItemClick = this.listItemClick.bind(this);
        this.cardCloseClick = this.cardCloseClick.bind(this);
    }

    ngOnInit() {
    }

    listItemClick(item, top) {
        this.item = item;
        this.itemTop = top;
        this.pageHeight = window.innerHeight;
        this.pageYOffset = document.getElementsByTagName('html')[0].scrollTop;
        this.viewTypeSwitch = true;
    }

    cardCloseClick() {
        this.viewTypeSwitch = false;
    }

    animStart(event) {
        if (event.fromState=='list') {
            this.pageYOffset = document.getElementsByTagName('html')[0].scrollTop;
        } else if (event.fromState=='card') {
            document.getElementsByTagName('html')[0].scrollTop = this.pageYOffset;
        }
    }

    animDone(event) {
        if (event.fromState=='list') {
            document.getElementsByTagName('html')[0].scrollTop = 0;
        } else if (event.fromState=='card') {

        }
    }
}
