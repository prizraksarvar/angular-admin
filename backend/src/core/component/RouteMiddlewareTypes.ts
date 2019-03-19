import {IRouterHandler} from "express";


export enum RouteMiddlewareTypes {
    "m-search" = "m-search",
    all = "all",
    checkout = "checkout",
    connect = "connect",
    copy = "copy",
    delete = "delete",
    get = "get",
    head = "head",
    lock = "lock",
    merge = "merge",
    mkactivity = "mkactivity",
    mkcol = "mkcol",
    move = "move",
    notify = "notify",
    options = "options",
    patch = "patch",
    post = "post",
    propfind = "propfind",
    proppatch = "proppatch",
    purge = "purge",
    put = "put",
    report = "report",
    search = "search",
    stack = "stack",
    subscribe = "subscribe",
    trace = "trace",
    unlock = "unlock",
    unsubscribe = "unsubscribe"
}
