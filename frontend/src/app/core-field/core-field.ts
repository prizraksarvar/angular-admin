import {Type} from "@angular/core";

export class CoreField {
    name: string;
    title: string;
    isReadOnly: boolean;
    listView: Type<any>;
    editView: Type<any>;
}

