import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {User} from "../entities/user";
import {AutorizationService} from "../services/autorization.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Subscription} from "rxjs";
import {AutorizationForm} from "./autorization-form";

@Component({
    selector: 'app-pages-autorization',
    templateUrl: './autorization.component.html',
    styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit, OnDestroy {
    user: User;
    isLoading: boolean;
    errors: string[];
    subscriptions: Subscription[];
    form: AutorizationForm;
    autorizationService: AutorizationService;

    constructor(@Inject('AutorizationService') autorizationService: AutorizationService) {
        this.autorizationService = autorizationService;
        this.form = new AutorizationForm();
        this.subscriptions = [];
        let state = autorizationService.getAutorizationState();
        this.isLoading = false;
        this.subscriptions.push(state.isLoading$.subscribe((value: boolean) => {
            this.isLoading = value
        }));
        this.user = null;
        this.subscriptions.push(state.user$.subscribe((value: User) => {
            this.user = value
        }));
        this.errors = [];
        this.subscriptions.push(state.errors$.subscribe((value: string[]) => {
            this.errors = value
        }));
    }

    onSubmitForm(): void {
        this.autorizationService.autorizate(this.form);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subsciption: Subscription, index: number, array: Subscription[]) => {
            subsciption.unsubscribe();
        });
    }
}
