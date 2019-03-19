import {Controller} from "../../core/component/Controller";
import {RouteMiddlewareTypes} from "../../core/component/RouteMiddlewareTypes";
import {IRequest} from "../../core/http/IRequest";
import {IResponse} from "../../core/http/IResponse";
import {INextFunction} from "../../core/http/INextFunction";
import {NotAutorizedState} from "./NotAutorizedState";
import {AutorizedState} from "./AutorizedState";
import {getConnection, getRepository, MoreThanOrEqual, Raw} from "typeorm";
import {User} from "../../entity/User";
import {comparePassword} from "../../core/helpers/PasswordHelper";
import {AutorizateResponse} from "./AutorizateResponse";
import {ResponseResultEnum} from "../../core/component/Response";
import bcrypt from "bcryptjs";
import {InternalErrorException} from "../../core/component/exceptions/InternalErrorException";
import {UserNotFoundException} from "./exceptions/UserNotFoundException";
import {UserSession} from "../../entity/UserSession";
import {generateToken} from "../../core/helpers/TokenGenerateHelper";


export class AutorizationController extends Controller{
    initMiddleware(): void {
        this.registerMiddleware(this.autorizationCheckMiddleware);
        this.registerRouteMiddleware(RouteMiddlewareTypes.get, "/autorization", this.route);
        this.registerRouteMiddleware(RouteMiddlewareTypes.post, "/autorization/autorizate", this.autorizate);
        this.registerRouteMiddleware(RouteMiddlewareTypes.post, "/autorization/checkAutorization", this.checkAutorization);
    }

    private async autorizationCheckMiddleware(request:IRequest, response:IResponse, next:INextFunction) {
        if (request.body && request.body.token) {
            var sessionID = request.body.token;
            console.log('cookie sessionID found '+sessionID);
            const sessionRepository = getRepository(UserSession);
            let date = new Date();
            date.setHours(date.getHours() + 3);
            //, updated: MoreThanOrEqual(date)
            sessionRepository.find({ where: { token: sessionID }, relations: ["user"] }).then((sessions:UserSession[])=>{
                if (sessions.length==0) {
                    throw new InternalErrorException('Сессия устарела');
                }

                if (sessions.length!=1) {
                    throw new InternalErrorException('Дубликат сессии');
                }

                let session = sessions[0];

                if (!session.user) {
                    throw new InternalErrorException('Сессия без пользователя, авторизация не требуется');
                }
                request.state = new AutorizedState(session, request.state);
                console.log(request.state);
            }).catch((err)=>{
                request.state = new NotAutorizedState(request.state);
                console.log(err);
            }).finally(next);
        } else {
            next();
        }
    }

    private autorizate(request:IRequest, response:IResponse, next:INextFunction) {
        const userRepository = getRepository(User);
        let result = new AutorizateResponse();
        result.user = null;
        result.errors = [];
        result.result = ResponseResultEnum.error;
        console.log(request.body.login);
        console.log(request.body.password);
        userRepository.find({ where: { login: request.body.login } }).then(async (users:User[])=>{
            console.log(users);
            if (users.length!=1) {
                throw new UserNotFoundException('');
            }

            let user = users[0];
            let value = await comparePassword(request.body.password,user.password);
            console.log(value);
            if (!value) {
                throw new UserNotFoundException('');
            }
            let salt = '';
            try {
                salt = await generateToken();
            } catch (e) {
                throw new InternalErrorException(e);
            }

            // TODO: Remove current session token if exist
            const sessionRepository = getRepository(UserSession);
            let session = sessionRepository.create();
            session.token = salt;
            session.user = user;
            sessionRepository.save(session).then(()=>{
                //response.cookie('sessionID',salt); //, { maxAge: 1800000, httpOnly: true, path: '/', domain: 'localhost' }
                result.user = {
                    id: user.id,
                    name: user.getFullName(),
                    login: user.login,
                    token: salt
                };
                result.result = ResponseResultEnum.success;
                response.send(result);
            });
        }).catch((err)=>{
            if (err instanceof UserNotFoundException) {
                result.errors.push('Не правильный логин или пароль');
                response.send(result);
            } else {
                result.errors.push('Сервер не смог обработать запроса');
                response.send(result);
                console.log(err);
            }
        });
    }

    private checkAutorization(request:IRequest, response:IResponse, next:INextFunction) {
        let result = new AutorizateResponse();
        result.user = null;
        result.errors = [];
        result.result = ResponseResultEnum.error;
        console.log(request.state);
        if (request.state instanceof AutorizedState) {
            const state:AutorizedState = request.state;
            result.user = {
                id: state.session.user.id,
                name: state.session.user.getFullName(),
                login: state.session.user.login,
                token: state.session.token
            };
            result.result = ResponseResultEnum.success;
            response.send(result);
            return;
        }
        result.errors.push('Пользователь не авторизован');
        response.send(result);
    }

    private route(request:IRequest, response:IResponse, next:INextFunction) {
        getConnection().manager.find(User).then((users)=>{
            response.send({users: users});
        }).catch((err)=>{
            response.send({error: err});
        });

    }
}
