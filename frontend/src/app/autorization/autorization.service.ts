import {Injectable} from '@angular/core';
import {User} from "../entities/User";
import {BehaviorSubject} from "rxjs";
import {AutorizationState} from "./autorization.state";
import {AutorizationForm} from "./autorization.form";

@Injectable({
    providedIn: 'root'
})
export class AutorizationService {
    state: AutorizationState;
    constructor() {
        this.state = new AutorizationState();
        this.loadStateFromServer();
    }

    getState() {
        return this.state;
    }

    autorizate(form:AutorizationForm) {
        // TODO: implement this
        this.state.isLoading$.next(true);
        setTimeout(()=>{
            let errors = [];
            if (form.email==='a' && form.password==='1') {
                let user = new User();
                user.id = 1;
                user.name = "Vasay";
                user.login = "vasay";
                user.token = "token";
                this.state.user$.next(user);
            } else {
                errors.push('Неверный логин или пароль');
            }
            this.state.errors$.next(errors);
            this.state.isLoading$.next(false);
        },500);
    }

    logout() {
        // TODO: implement this
        this.state.isLoading$.next(true);
        setTimeout(()=>{
            let errors = [];
            this.state.user$.next(null);
            this.state.isLoading$.next(false);
            this.state.errors$.next(errors);
        },500);
    }

    private loadStateFromServer() {
        this.state.isLoading$.next(true);
        // TODO: implement this
        setTimeout(()=>{
            let errors = [];
            this.state.isLoading$.next(false);
            this.state.errors$.next(errors);
        },1500);
    }
}
