import {RequestState} from "../../core/http/request.state";
import {User} from "../../entities/User";
import {RequestStateInterface} from "../../core/http/request.state.inteface";
import {UserSession} from "../../entities/UserSession";


export class AutorizedState extends RequestState {
    constructor(
        public session: UserSession,
        lastState?: RequestStateInterface
    ) {
        super(lastState);
    }


}