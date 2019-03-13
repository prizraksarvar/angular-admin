import {Application} from "../Application";
import {IMiddlewareHandler} from "../http/IMiddlewareHandler";
import {MiddlewareHandlerAdapter} from "../http/MiddlewareHandlerAdapter";
import {RouteMiddlewareTypes} from "./RouteMiddlewareTypes";


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

    protected registerMiddleware(handler:IMiddlewareHandler):void;
    protected registerMiddleware(path:string,handler:IMiddlewareHandler): void;
    protected registerMiddleware(path:any,handler?:any) {
        if (typeof path === "string") {
            this.app.getServer().use(path,MiddlewareHandlerAdapter.handler(handler));
        } else {
            this.app.getServer().use(MiddlewareHandlerAdapter.handler(path));
        }
    }

    protected registerRouteMiddleware(type:RouteMiddlewareTypes, handler:IMiddlewareHandler):void;
    protected registerRouteMiddleware(type:RouteMiddlewareTypes, path:string,handler:IMiddlewareHandler): void;
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
