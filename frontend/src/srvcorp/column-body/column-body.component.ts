import {Component, Input, OnInit} from '@angular/core';
import {DataType} from "../utils/data-type";

@Component({
  selector: 'srvcorp-column-header',
  templateUrl: './column-body.component.html',
  styleUrls: ['./column-body.component.css']
})
export class ColumnBodyComponent implements OnInit {
  @Input() value: String;
  @Input() dataType: DataType;

  constructor() { }

  ngOnInit() {
  }

}
