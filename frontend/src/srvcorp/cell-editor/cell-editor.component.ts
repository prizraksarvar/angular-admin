import {Component, Input, OnInit} from '@angular/core';
import {DataType} from "../utils/data-type";

@Component({
  selector: 'srvcorp-cell-editor',
  templateUrl: './cell-editor.component.html',
  styleUrls: ['./cell-editor.component.css']
})
export class CellEditorComponent implements OnInit {
  @Input() value: String;
  @Input() dataType: DataType;

  constructor() { }

  ngOnInit() {
  }

  isString() {
    return this.dataType=="string";
  }

  isNumber() {
    return this.dataType=="number";
  }

  isBoolean() {
    return this.dataType=="boolean";
  }

  isDate() {
    return this.dataType=="date";
  }
}
