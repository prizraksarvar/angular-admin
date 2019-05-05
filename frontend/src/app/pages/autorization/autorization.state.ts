import {User} from "../../entities/user";
import {BehaviorSubject} from "rxjs";


export class AutorizationState {
    user$: BehaviorSubject<User>;
    isLoading$: BehaviorSubject<boolean>;
    errors$: BehaviorSubject<string[]>;

    constructor() {
        this.user$ = new BehaviorSubject<User>(null);
        this.isLoading$ = new BehaviorSubject<boolean>(false);
        this.errors$ = new BehaviorSubject<string[]>([]);
    }

}