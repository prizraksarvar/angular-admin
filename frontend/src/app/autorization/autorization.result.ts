import {User} from "../entities/user";
import {BehaviorSubject} from "rxjs";
import {HttpResult} from "../entities/http.result";


export class AutorizationResult extends HttpResult{
    user?: User;
}
