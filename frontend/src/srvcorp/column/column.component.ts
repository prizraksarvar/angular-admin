import {Component, Input, OnInit} from '@angular/core';
import {DataType} from "../utils/data-type";

@Component({
  selector: 'srvcorp-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
  @Input() field: String;
  @Input() dataType: DataType;

  constructor() { }

  ngOnInit() {
  }

}
