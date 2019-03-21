import { Injectable } from '@angular/core';

export enum MessagelogStatus {
    default,
    danger,
    success,
    warning,
    info
}
@Injectable({ providedIn: 'root' })
export class MessagelogService {
    messages: string[] = [];

    add(message: string, status: MessagelogStatus) {
        let c:string = "text-";
        switch (status) {
            case MessagelogStatus.danger: c+='danger';break;
            case MessagelogStatus.success: c+='success';break;
            case MessagelogStatus.warning: c+='warning';break;
            case MessagelogStatus.info: c+='info';break;
            default: c+='primary';break;
        }
        this.messages.push(`<span class="${c}">${message}</span>`);
    }

    clear() {
        this.messages = [];
    }
}
