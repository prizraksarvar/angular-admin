import {Controller} from "../../core/component/Controller";
import {RouteMiddlewareTypes} from "../../core/component/RouteMiddlewareTypes";
import {IRequest} from "../../core/http/IRequest";
import {IResponse} from "../../core/http/IResponse";
import {INextFunction} from "../../core/http/INextFunction";
import {NotAutorizedState} from "./NotAutorizedState";
import {AutorizedState} from "./AutorizedState";
import {getConnection} from "typeorm";
import {User} from "../../entity/User";


export class AutorizationController extends Controller{
    initMiddleware(): void {
        this.registerMiddleware(this.autorizationCheckMiddleware);
        this.registerRouteMiddleware(RouteMiddlewareTypes.get, "/", this.route)
    }

    private autorizationCheckMiddleware(request:IRequest, response:IResponse, next:INextFunction) {
        console.log("request in AutorizationController");
        if (true) {
            request.state = new NotAutorizedState(request.state);
        } else {
            request.state = new AutorizedState(request.state);
        }
        next();
    }

    private route(request:IRequest, response:IResponse, next:INextFunction) {
        getConnection().manager.find(User).then((users)=>{
            response.send({users: users});
        }).catch((err)=>{
            response.send({error: err});
        });

    }
}
