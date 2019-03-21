import {Type} from "@angular/core";

export class CoreField {
    name: string;
    title: string;
    isReadOnly: boolean;
    listView: Type<any>;
    editView: Type<any>;
}

export class CoreFieldBuilder {
    private field: CoreField;

    private constructor() {
        this.field = new CoreField();
    }

    public static create() {
        return new CoreFieldBuilder();
    }

    public setName(name:string) {
        this.field.name = name;
        return this;
    }

    public setTitle(title:string) {
        this.field.title = title;
        return this;
    }

    public setReadOnly(isReadOnly:boolean) {
        this.field.isReadOnly = isReadOnly;
        return this;
    }

    public setListView(listView:Type<any>) {
        this.field.listView = listView;
        return this;
    }

    public setEditView(editView:Type<any>) {
        this.field.editView = editView;
        return this;
    }

    public build() {
        return this.field;
    }
}
