import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Menu} from "../entities/menu";
import {Observable} from "rxjs";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    menu: Menu[];
    navStart: Observable<NavigationStart>;

    constructor(private router: Router) {
        this.menu = [];
        this.setMenuItems();
        // Create a new Observable that publishes only the NavigationStart event
        this.navStart = router.events.pipe(
            filter(evt => evt instanceof NavigationStart)
        ) as Observable<NavigationStart>;
    }

    ngOnInit() {
        this.navStart.subscribe(evt => console.log('Navigation Started!'));
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

        item = new Menu();
        item.id=1;
        item.name='Animtest';
        item.url='/animtest';
        item.icon='';
        item.isActive=false;
        this.menu.push(item);
    }
}
