import {IMiddlewareHandler} from "./IMiddlewareHandler";
import {IncomingMessage, ServerResponse} from "http";
import {Request, Response} from "express";
import {INextFunction} from "./INextFunction";
import {IRequest} from "./IRequest";
import {IResponse} from "./IResponse";


export class MiddlewareHandlerAdapter {
    public static handler(handler:IMiddlewareHandler) {
        return (request:Request, response:Response, next:INextFunction)=>{
            handler(request as IRequest,response as IResponse, next);
        };
    }
}
