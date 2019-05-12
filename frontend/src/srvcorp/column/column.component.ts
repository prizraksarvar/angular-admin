import {Component, ContentChild, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DataType} from "../utils/data-type";

@Component({
  selector: 'srvcorp-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
  @Input() field: string;
  @Input() dataType: DataType;
  @Input() title: string;
  @ContentChild(ColumnComponent) header: ColumnComponent;
  @ContentChild(ColumnComponent) column: ColumnComponent;

  constructor() { }

  ngOnInit() {
  }

}
