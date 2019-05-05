import {User} from "../../entities/user";
import {BehaviorSubject} from "rxjs";
import {HttpResult} from "../../core/http.result";


export class AutorizationResult extends HttpResult{
    user?: User;
}