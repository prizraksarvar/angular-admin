import {Application} from "../application";
import {MiddlewareHandler} from "../http/middleware-handler";
import {MiddlewareHandlerAdapter} from "../http/middleware-handler-adapter";
import {RouteMiddlewareTypes} from "./route-middleware-types";


export abstract class Controller {
    private app:Application;

    public setApplication(app:Application) {
        this.app = app;
    }

    public getApplication() {
        return this.app;
    }

    public init() {
        this.initMiddleware();
    }

    /**
     * register to app middleware functions (routes and other)
     *
     * use registerMiddleware(),registerGetMiddleware(),registerPostMiddleware() functions to register
     */
    abstract initMiddleware():void;

    protected registerMiddleware(handler:MiddlewareHandler):void;
    protected registerMiddleware(path:string,handler:MiddlewareHandler): void;
    protected registerMiddleware(path:any,handler?:any) {
        if (typeof path === "string") {
            this.app.getServer().use(path,MiddlewareHandlerAdapter.handler(handler));
        } else {
            this.app.getServer().use(MiddlewareHandlerAdapter.handler(path));
        }
    }

    protected registerRouteMiddleware(type:RouteMiddlewareTypes, handler:MiddlewareHandler):void;
    protected registerRouteMiddleware(type:RouteMiddlewareTypes, path:string,handler:MiddlewareHandler): void;
    protected registerRouteMiddleware(type:RouteMiddlewareTypes, path:any,handler?:any) {
        if (typeof path === "string") {
            // @ts-ignore
            this.app.getServer()[type](path,MiddlewareHandlerAdapter.handler(handler));
        } else {
            // @ts-ignore
            this.app.getServer()[type](MiddlewareHandlerAdapter.handler(path));
        }
    }
}