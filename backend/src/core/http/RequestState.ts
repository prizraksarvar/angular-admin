import {IRequestState} from "./IRequestState";

export abstract class RequestState implements IRequestState {
    constructor(lastState?: IRequestState) {

    }
}
