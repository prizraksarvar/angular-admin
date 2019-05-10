import { Injectable } from '@angular/core';
import {AutorizationService} from "./autorization.service";
import {AutorizationState} from "../autorization/autorization.state";
import {AppWebservice} from "../app.webservice";
import {MessagelogService, MessagelogStatus} from "./messagelog.service";
import {CookieService} from "ngx-cookie-service";
import {AutorizationForm} from "../autorization/autorization-form";
import {AutorizationResult} from "../autorization/autorization.result";
import {HttpResultEnum} from "../entities/http.result";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class MockService implements AutorizationService {
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
    setTimeout(()=>{
      let errors = [];
      if (form.login=="admin" && form.password=="testPass123") {
        this.autorizationSessionId = "token1";
        this.cookieService.set("sessionId", this.autorizationSessionId);
        this.autorizationState.user$.next(this.getAdminUser());
      } else {
        this.autorizationState.user$.next(null);
        errors = ["Пользователь с таким логином и паролем не найден"];
      }
      this.autorizationState.errors$.next(errors);
      this.autorizationState.isLoading$.next(false);
    },500);
  }

  logout() {
    // TODO: implement this
    this.autorizationState.isLoading$.next(true);
    let errors = [];
    this.autorizationState.errors$.next(errors);
    this.autorizationState.isLoading$.next(true);
    setTimeout(()=>{
      this.autorizationState.user$.next(null);
      this.autorizationState.isLoading$.next(false);
      this.autorizationSessionId = "";
      this.cookieService.set("sessionId", this.autorizationSessionId);
    },500);
  }

  private getAdminUser() {
    let user = new User();
    user.id=1;
    user.login="admin";
    user.name="Admin";
    user.token="token1";
    return user;
  }

  private loadStateFromServer() {
    this.autorizationState.isLoading$.next(true);
    setTimeout(()=>{
      if (this.autorizationSessionId=="token1") {
        this.autorizationState.user$.next(this.getAdminUser());
      } else {
        this.autorizationState.user$.next(null);
      }
      let errors = [];
      this.autorizationState.isLoading$.next(false);
      this.autorizationState.errors$.next(errors);
    },500);
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
