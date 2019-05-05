

export enum ResponseResultEnum {
    success = "success",
    error = "error"
}

export class Response {
    errors: string[];
    result: ResponseResultEnum
}