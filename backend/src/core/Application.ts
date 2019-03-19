import {Connection} from "typeorm";
import {Express, IRouterHandler, json, NextFunction, Request, Response} from "express";
import {rejects} from "assert";
import database from "./database";
import serverStarter from "./server";
import {Controller} from "./component/Controller";
import {IRequest} from "./http/IRequest";
import {IResponse} from "./http/IResponse";
import {DefaultRequestState} from "./http/DefaultRequestState";
import {MiddlewareHandlerAdapter} from "./http/MiddlewareHandlerAdapter";


export class Application {
    private connection: Connection;
    private server: Express;
    private controllers: Controller[];

    static create():Promise<Application> {
        return new Promise<Application>((resolve,reject)=>{
            let app = new Application();
            database.then((connection)=>{
                console.log('DB connected');
                app.connection = connection;
                serverStarter(8080, '127.0.0.1').then((server)=>{
                    console.log('server started and listening on port 8080');
                    app.server = server;
                    server.use(MiddlewareHandlerAdapter.handler(Application.prepareRequest));
                    resolve(app);
                }).catch(reject);
            }).catch(reject);
        });
    }

    protected static prepareRequest(request:IRequest, response:IResponse, next:NextFunction) {
        request.state = new DefaultRequestState();
        next();
    }

    public registerController(controller:Controller) {
        controller.setApplication(this);
        controller.init();
        this.controllers.push(controller);
    }

    public getServer() {
        return this.server;
    }

    public getConnecion() {
        return this.connection;
    }

    protected constructor() {
        this.controllers = [];
    }
}
