import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {MessagelogService, MessagelogStatus} from "./messagelog.service";
import {HttpResultEnum} from "../entities/http.result";
import {CookieService} from 'ngx-cookie-service';
import {AppWebservice} from "../app.webservice";
import {AutorizationState} from "../autorization/autorization.state";
import {AutorizationForm} from "../autorization/autorization-form";
import {AutorizationResult} from "../autorization/autorization.result";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private apiUrl = 'autorization/';
    private readonly state: AutorizationState;
    private sessionId: string;

    constructor(
        private http: AppWebservice,
        private messageService: MessagelogService,
        private cookieService: CookieService
    ) {
        this.state = new AutorizationState();
        this.sessionId = cookieService.get("sessionId");
        this.loadStateFromServer();
    }

    getState() {
        return this.state;
    }

    autorizate(form: AutorizationForm) {
        this.state.isLoading$.next(true);
        this.http.post<AutorizationResult>(this.apiUrl + 'autorizate', form)
            .subscribe((result: AutorizationResult) => {
                let errors = [];
                if (result.user) {
                    this.sessionId = result.user.token;
                    this.cookieService.set("sessionId", this.sessionId);
                }
                this.state.user$.next(result.user);
                if (result.result == HttpResultEnum.success) {

                } else if (result.result == HttpResultEnum.error) {
                    errors = result.errors;
                }
                this.state.errors$.next(errors);
            }, this.httpErrorHandle, () => {
                this.state.isLoading$.next(false);
            });
    }

    logout() {
        // TODO: implement this
        this.state.isLoading$.next(true);
        let errors = [];
        this.state.errors$.next(errors);
        this.state.isLoading$.next(true);
        this.http.post<AutorizationResult>(this.apiUrl + 'logout', {token: this.sessionId})
            .subscribe(null, this.httpErrorHandle, () => {
                this.state.user$.next(null);
                this.state.isLoading$.next(false);
            });
    }

    private loadStateFromServer() {
        this.state.isLoading$.next(true);
        this.http.post<AutorizationResult>(this.apiUrl + 'checkAutorization', {token: this.sessionId})
            .subscribe((result: AutorizationResult) => {
                this.state.user$.next(result.user);
            }, this.httpErrorHandle, () => {
                let errors = [];
                this.state.isLoading$.next(false);
                this.state.errors$.next(errors);
            });
    }

    private httpErrorHandle(error) {
        this.state.user$.next(null);
        this.state.errors$.next(['Что-то пошло не так...']);
        this.log(`${error}`, MessagelogStatus.warning)
    }

    private log(message: string, status: MessagelogStatus) {
        this.messageService.add(`AuthService: ${message}`, status);
    }
}
