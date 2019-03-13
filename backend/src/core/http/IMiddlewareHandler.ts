import {IRequest} from "./IRequest";
import {IResponse} from "./IResponse";
import {INextFunction} from "./INextFunction";


export interface IMiddlewareHandler {
    (request:IRequest, response:IResponse, next:INextFunction):void;
}
