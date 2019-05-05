import { Component, Input }  from '@angular/core';
import {CoreFieldView} from "../core-field-view";
import {CoreField} from "../core-field";

@Component({
    template: `
        {{value}}
  `
})
export class CoreTextViewComponent implements CoreFieldView {
    @Input() field: CoreField;
    @Input() value: any;
}