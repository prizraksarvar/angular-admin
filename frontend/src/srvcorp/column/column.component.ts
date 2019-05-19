import {AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DataType} from "../utils/data-type";
import {HeaderComponent} from "../header/header.component";
import {CellComponent} from "../cell/cell.component";
import {HeaderDirective} from "./header.directive";
import {CellDirective} from "./cell.directive";

@Component({
  selector: 'srvcorp-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit, AfterContentInit {
  @Input() field: string;
  @Input() dataType: DataType;
  @Input() title: string;
  @Input() editable: boolean = false;
  @ContentChild(HeaderDirective) header: HeaderDirective;
  @ContentChild(CellDirective) cell: CellDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    console.log(this.dataType);
  }

}
