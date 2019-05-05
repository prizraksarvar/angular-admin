import {Response} from "../../core/component/response";


export class AutorizateResponse extends Response{
    user: {
        id: number;
        name: string;
        login: string;
        token: string;
    } | null // TODO: make this as frontend User entity
}