import {Injectable} from '@angular/core';
import {User} from "../entities/User";
import {Observable, of} from "rxjs";
import {AutorizationState} from "./autorization.state";
import {AutorizationForm} from "./autorization.form";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "../message.service";
import {HttpResultEnum} from "../core/http.result";
import {AutorizationResult} from "./autorization.result";
import {AppHttp} from "../app.http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AutorizationService {
    private apiUrl = AppHttp.API_URL + 'autorization/';
    private readonly state: AutorizationState;
    constructor(private http: HttpClient, private messageService: MessageService) {
        this.state = new AutorizationState();
        this.loadStateFromServer();
    }

    getState() {
        return this.state;
    }

    autorizate(form:AutorizationForm) {
        this.state.isLoading$.next(true);
        this.http.post<AutorizationResult>(this.apiUrl+'autorizate', form, httpOptions).pipe(
            tap((result: AutorizationResult) => this.log(`autorizate user ${result.result}`)),
            catchError(this.handleError<AutorizationResult>('autorizate'))
        ).subscribe((result:AutorizationResult)=>{
            let errors = [];
            this.state.user$.next(result.user);
            if (result.result == HttpResultEnum.success) {

            } else if (result.result == HttpResultEnum.error) {
                errors = result.errors;
            }
            this.state.errors$.next(errors);
        }, (error)=>{
            this.state.user$.next(null);
            this.state.errors$.next(['Что-то пошло не так...']);
        }, ()=>{
            this.state.isLoading$.next(false);
        });
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
        this.http.post<AutorizationResult>(this.apiUrl+'checkAutorization', null, httpOptions).pipe(
            tap((result: AutorizationResult) => this.log(`checkAutorization user ${result.result}`)),
            catchError(this.handleError<AutorizationResult>('checkAutorization'))
        ).subscribe((result:AutorizationResult)=>{
            this.state.user$.next(result.user);
        }, (error)=>{
            this.state.user$.next(null);
            this.state.errors$.next(['Что-то пошло не так...']);
        }, ()=>{
            let errors = [];
            this.state.isLoading$.next(false);
            this.state.errors$.next(errors);
        });
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`AuthService: ${message}`);
    }
}
