import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {AutorizationState} from "../autorization/autorization.state";
import {AutorizationForm} from "../autorization/autorization-form";
import {catchError, tap} from "rxjs/operators";
import {MessagelogService, MessagelogStatus} from "./messagelog.service";
import {HttpResultEnum} from "../entities/http.result";
import {AutorizationResult} from "../autorization/autorization.result";
import {CookieService} from 'ngx-cookie-service';
import {AppWebservice} from "../app.webservice";


export interface AutorizationService {
  getAutorizationState();
  autorizate(form: AutorizationForm);
  logout();
}
