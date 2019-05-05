import {RequestStateInterface} from "./request.state.inteface";

export abstract class RequestState implements RequestState {
    constructor(
        lastState?: RequestState
    ) {

    }

}