import {IRequestState} from "./IRequestState";
import {Request} from "express";

export interface IRequest extends Request{
    state:IRequestState;
}
