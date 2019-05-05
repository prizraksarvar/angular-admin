import {RequestInterface} from "./request-interface";
import {ResponseInterface} from "./response-interface";
import {NextFunction} from "./next.function";


export interface MiddlewareHandler {
    (request:RequestInterface, response:ResponseInterface, next:NextFunction):void;
}