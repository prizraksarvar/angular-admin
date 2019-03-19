import {User} from "../entities/User";
import {BehaviorSubject} from "rxjs";
import {HttpResult} from "../core/http.result";


export class AutorizationResult extends HttpResult{
    user?: User;
}
