

export enum HttpResultEnum {
    success = "success",
    error = "error"
}
export class HttpResult {
    errors: string[];
    result: HttpResultEnum
}