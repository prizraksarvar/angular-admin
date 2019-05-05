import {MiddlewareHandler} from "./middleware-handler";
import {IncomingMessage, ServerResponse} from "http";
import {Request, Response} from "express";
import {NextFunction} from "./next.function";
import {RequestInterface} from "./request-interface";
import {ResponseInterface} from "./response-interface";


export class MiddlewareHandlerAdapter {
    public static handler(handler:MiddlewareHandler) {
        return (request:Request, response:Response, next:NextFunction)=>{
            handler(request as RequestInterface,response as ResponseInterface, next);
        };
    }
}