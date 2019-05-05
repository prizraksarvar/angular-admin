import {RequestStateInterface} from "./request.state.inteface";
import {Request} from "express";

export interface RequestInterface extends Request {
    state:RequestStateInterface;
    data:any;
    xcookies: any
}