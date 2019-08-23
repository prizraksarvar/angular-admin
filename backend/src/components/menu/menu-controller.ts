import {Controller} from "../../core/component/controller";
import {RouteMiddlewareTypes} from "../../core/component/route-middleware-types";
import {RequestInterface} from "../../core/http/request-interface";
import {ResponseInterface} from "../../core/http/response-interface";
import {NextFunction} from "../../core/http/next.function";
import {getRepository} from "typeorm";
import {Response, ResponseResultEnum} from "../../core/component/response";
import {UserSession} from "../../entities/UserSession";
import {AutorizedState} from "../autorization/autorized.state";
import {MiddlewareHandler} from "../../core/http/middleware-handler";
import {Menu} from "../../entities/Menu";
import {MenuItemsResponse} from "./menu-items.response";


export class MenuController extends Controller{
    initMiddleware(): void {
        this.registerRouteMiddleware(RouteMiddlewareTypes.post, "/menu/getItems", this.autorizationWrapper(this.getItems));
    }

    private getItems(request:RequestInterface, response:ResponseInterface, next:NextFunction) {
        const menuRepository = getRepository(Menu);
        menuRepository.find().then((items)=>{
            let result = new MenuItemsResponse();
            result.items = items;
            result.errors = [];
            result.result = ResponseResultEnum.success;
            response.send(result);
        }).catch((err)=>{
            let result = new MenuItemsResponse();
            result.items = null;
            result.errors = [err];
            result.result = ResponseResultEnum.error;
        });
    }
}
