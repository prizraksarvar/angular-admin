import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Menu} from "../../entities/menu";
import {Observable} from "rxjs";
import {CoreField} from "./field/core-field";
import {CoreInputViewComponent} from "./field/views/core-input-view.component";
import {CoreTextViewComponent} from "./field/views/core-text-view.component";
import {CoreFieldBuilder} from "./field/core-field.builder";

@Component({
    selector: 'app-admin-core',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    fields: CoreField[] = [];

    constructor() {
    }

    ngOnInit() {

    }
}
