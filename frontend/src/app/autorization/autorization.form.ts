import {User} from "../entities/User";
import {BehaviorSubject} from "rxjs";


export class AutorizationForm {
    login: string = '';
    password: string = '';
    isRememberMe: boolean = false;
}
