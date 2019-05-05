import {User} from "../../entities/user";
import {BehaviorSubject} from "rxjs";


export class AutorizationForm {
    login: string = '';
    password: string = '';
    isRememberMe: boolean = false;
}