import {Injectable} from '@angular/core';
import {AutorizationState} from "../autorization/autorization.state";
import {AppWebservice} from "../app.webservice";
import {MessagelogService, MessagelogStatus} from "./messagelog.service";
import {CookieService} from "ngx-cookie-service";
import {AutorizationForm} from "../autorization/autorization-form";
import {AutorizationResult} from "../autorization/autorization.result";
import {HttpResultEnum} from "../entities/http.result";
import {AutorizationService} from "./autorization.service";

@Injectable({
  providedIn: 'root'
})
export class WebService implements AutorizationService {
  private autorizationUrl = 'autorization/';
  private readonly autorizationState: AutorizationState;
  private autorizationSessionId: string;

  constructor(
    private http: AppWebservice,
    private messageService: MessagelogService,
    private cookieService: CookieService
  ) {
    this.autorizationState = new AutorizationState();
    this.autorizationSessionId = cookieService.get("sessionId");
    this.loadStateFromServer();
  }

  getAutorizationState() {
    return this.autorizationState;
  }

  autorizate(form: AutorizationForm) {
    this.autorizationState.isLoading$.next(true);
    this.http.post<AutorizationResult>(this.autorizationUrl + 'autorizate', form)
      .subscribe((result: AutorizationResult) => {
        let errors = [];
        if (result.user) {
          this.autorizationSessionId = result.user.token;
          this.cookieService.set("sessionId", this.autorizationSessionId);
        }
        this.autorizationState.user$.next(result.user);
        if (result.result == HttpResultEnum.success) {

        } else if (result.result == HttpResultEnum.error) {
          errors = result.errors;
        }
        this.autorizationState.errors$.next(errors);
      }, this.httpErrorHandle, () => {
        this.autorizationState.isLoading$.next(false);
      });
  }

  logout() {
    // TODO: implement this
    this.autorizationState.isLoading$.next(true);
    let errors = [];
    this.autorizationState.errors$.next(errors);
    this.autorizationState.isLoading$.next(true);
    this.http.post<AutorizationResult>(this.autorizationUrl + 'logout', {token: this.autorizationSessionId})
      .subscribe(null, this.httpErrorHandle, () => {
        this.autorizationState.user$.next(null);
        this.autorizationState.isLoading$.next(false);
      });
  }

  private loadStateFromServer() {
    this.autorizationState.isLoading$.next(true);
    this.http.post<AutorizationResult>(this.autorizationUrl + 'checkAutorization', {token: this.autorizationSessionId})
      .subscribe((result: AutorizationResult) => {
        this.autorizationState.user$.next(result.user);
      }, this.httpErrorHandle, () => {
        let errors = [];
        this.autorizationState.isLoading$.next(false);
        this.autorizationState.errors$.next(errors);
      });
  }

  private httpErrorHandle(error) {
    this.autorizationState.user$.next(null);
    this.autorizationState.errors$.next(['Что-то пошло не так...']);
    this.log(`${error}`, MessagelogStatus.warning)
  }

  private log(message: string, status: MessagelogStatus) {
    this.messageService.add(`AuthService: ${message}`, status);
  }
}
