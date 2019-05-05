import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Menu} from "../../entities/menu";
import {Observable} from "rxjs";
import {CoreField} from "../../admin/core/field/core-field";
import {CoreInputViewComponent} from "../../admin/core/field/views/core-input-view.component";
import {CoreTextViewComponent} from "../../admin/core/field/views/core-text-view.component";
import {CoreFieldBuilder} from "../../admin/core/field/core-field.builder";

@Component({
    selector: 'app-pages-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuAdminComponent implements OnInit {
    menu: Menu[];
    navStart: Observable<NavigationStart>;
    fields: CoreField[] = [
        CoreFieldBuilder.create()
            .setName('id')
            .setTitle('ID')
            .setListView(CoreTextViewComponent)
            .setEditView(CoreTextViewComponent)
            .setReadOnly(true)
            .build(),
        CoreFieldBuilder.create()
            .setName('name')
            .setTitle('Name')
            .setListView(CoreInputViewComponent)
            .setEditView(CoreInputViewComponent)
            .build(),
        CoreFieldBuilder.create()
            .setName('url')
            .setTitle('URL')
            .setListView(CoreInputViewComponent)
            .setEditView(CoreInputViewComponent)
            .build()
    ];

    constructor() {
        this.menu = [];
        this.setMenuItems();
    }

    ngOnInit() {

    }

    private setMenuItems() {
        let item = new Menu();
        item.id=1;
        item.name='Dashboard';
        item.url='/dashboard';
        item.icon='';
        item.isActive=false;
        this.menu.push(item);

        item = new Menu();
        item.id=1;
        item.name='Menu';
        item.url='/menu';
        item.icon='';
        item.isActive=false;
        this.menu.push(item);
    }
}
