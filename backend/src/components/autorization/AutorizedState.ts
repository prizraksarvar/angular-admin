import {RequestState} from "../../core/http/RequestState";
import {User} from "../../entity/User";
import {IRequestState} from "../../core/http/IRequestState";
import {UserSession} from "../../entity/UserSession";


export class AutorizedState extends RequestState {
    constructor(
        public session: UserSession,
        lastState?: IRequestState
    ) {
        super(lastState);
    }


}
