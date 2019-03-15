import {User} from "../entities/User";
import {BehaviorSubject} from "rxjs";


export class AutorizationForm {
    email: string = '';
    password: string = '';
    isRememberMe: boolean = false;
}
