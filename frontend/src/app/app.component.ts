import {Component, OnDestroy, OnInit} from '@angular/core';
import {AutorizationService} from "./core/autorization.service";
import {Subscription} from "rxjs";
import {User} from "./entities/user";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Angular admin';
    user: User;
    subscriptions:Subscription[];
    autorizationService: AutorizationService;

    constructor(autorizationService: AutorizationService) {
        this.autorizationService = autorizationService;
        this.subscriptions = [];
        let state = autorizationService.getState();
        this.user = null;
        this.subscriptions.push(state.user$.subscribe((value:User)=>{this.user = value}));
    }

    logout() {
        this.autorizationService.logout();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subsciption: Subscription, index: number, array: Subscription[]) => {
            subsciption.unsubscribe();
        });
    }
}
