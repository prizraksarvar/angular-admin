import {RequestState} from "../../core/http/RequestState";
import {User} from "../../entity/User";
import {IRequestState} from "../../core/http/IRequestState";


export class AutorizedState extends RequestState {
    constructor(
        public user: User,
        lastState?: IRequestState
    ) {
        super(lastState);
    }


}
