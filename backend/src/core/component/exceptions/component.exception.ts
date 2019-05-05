

export class ComponentException implements Error {
    message: string;
    name: string;
    stack: string;

    constructor(message?: string) {
        if (message)
            this.message = message;
    }
}