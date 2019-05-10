import { Component, Input }  from '@angular/core';
import {CoreFieldView} from "../core-field-view";
import {CoreField} from "../core-field";

@Component({
    template: `
        <input [(ngModel)]="value" type="text" class="form-control-plaintext">
  `
})
export class CoreInputViewComponent implements CoreFieldView {
    @Input() field: CoreField;
    @Input() value: any;
}