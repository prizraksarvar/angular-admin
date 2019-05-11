import {Component, Input, OnInit} from '@angular/core';
import {DataType} from "../utils/data-type";

@Component({
  selector: 'srvcorp-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.css']
})
export class ColumnHeaderComponent implements OnInit {
  @Input() value: String;

  constructor() { }

  ngOnInit() {
  }

}
