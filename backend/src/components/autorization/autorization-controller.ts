import {Controller} from "../../core/component/controller";
import {RouteMiddlewareTypes} from "../../core/component/route-middleware-types";
import {RequestInterface} from "../../core/http/request-interface";
import {ResponseInterface} from "../../core/http/response-interface";
import {NextFunction} from "../../core/http/next.function";
import {NotAutorizedState} from "./not-autorized.state";
import {AutorizedState} from "./autorized.state";
import {getConnection, getRepository, MoreThanOrEqual, Raw} from "typeorm";
import {User} from "../../entities/User";
import {comparePassword} from "../../core/helpers/password.helper";
import {AutorizateResponse} from "./autorizate-response";
import {ResponseResultEnum} from "../../core/component/response";
import bcrypt from "bcryptjs";
import {InternalErrorException} from "../../core/component/exceptions/internal-error.exception";
import {UserNotFoundException} from "./exceptions/user-not-found.exception";
import {UserSession} from "../../entities/UserSession";
import {generateToken} from "../../core/helpers/token-generate.helper";


export class AutorizationController extends Controller{
    initMiddleware(): void {
        this.registerMiddleware(this.autorizationCheckMiddleware);
        this.registerRouteMiddleware(RouteMiddlewareTypes.get, "/autorization", this.route);
        this.registerRouteMiddleware(RouteMiddlewareTypes.post, "/autorization/autorizate", this.autorizate);
        this.registerRouteMiddleware(RouteMiddlewareTypes.post, "/autorization/checkAutorization", this.checkAutorization);
        this.registerRouteMiddleware(RouteMiddlewareTypes.post, "/autorization/logout", this.logout);
    }

    private async autorizationCheckMiddleware(request:RequestInterface, response:ResponseInterface, next:NextFunction) {
        let cookieString = request.header("X-Cookie");
        request.xcookies = {};
        if (typeof cookieString == 'string') {
            const cookies = cookieString.split(';');
            cookies.forEach((item)=>{
                let s = item.split('=',2);
                if (s.length==2) {
                    request.xcookies[s[0]] = s[1];
                }
            });
        }
        console.log(request.xcookies);

        if (request.xcookies && request.xcookies.sessionId) {
            var sessionID = request.xcookies.sessionId;
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
            }).catch((err)=>{
                request.state = new NotAutorizedState(request.state);
                console.log(err);
            }).finally(next);
        } else {
            next();
        }
    }

    private autorizate(request:RequestInterface, response:ResponseInterface, next:NextFunction) {
        const userRepository = getRepository(User);
        let result = new AutorizateResponse();
        result.user = null;
        result.errors = [];
        result.result = ResponseResultEnum.error;
        userRepository.find({ where: { login: request.body.login } }).then(async (users:User[])=>{
            if (users.length!=1) {
                throw new UserNotFoundException('');
            }

            let user = users[0];
            let value = await comparePassword(request.body.password,user.password);
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

    private checkAutorization(request:RequestInterface, response:ResponseInterface, next:NextFunction) {
        let result = new AutorizateResponse();
        result.user = null;
        result.errors = [];
        result.result = ResponseResultEnum.error;
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

    private logout(request:RequestInterface, response:ResponseInterface, next:NextFunction) {
        let result = new AutorizateResponse();
        result.user = null;
        result.errors = [];
        result.result = ResponseResultEnum.error;
        if (request.state instanceof AutorizedState) {
            const state:AutorizedState = request.state;
            const sessionRepository = getRepository(UserSession);
            sessionRepository.remove([state.session]).then(()=>{
                result.result = ResponseResultEnum.success;
                response.send(result);
            }).catch((error)=>{
                console.log(error);
                result.errors.push('Ошибка обработки запроса');
                response.send(result);
            });
            return;
        }
        result.errors.push('Пользователь не авторизован');
        response.send(result);
    }

    private route(request:RequestInterface, response:ResponseInterface, next:NextFunction) {
        getConnection().manager.find(User).then((users)=>{
            response.send({users: users});
        }).catch((err)=>{
            response.send({error: err});
        });

    }
}