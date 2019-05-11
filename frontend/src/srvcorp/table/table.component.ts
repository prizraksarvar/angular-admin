import {Component, Input, OnInit} from '@angular/core';
import {Menu} from "../../app/entities/menu";

@Component({
  selector: 'srvcorp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data:any[];
  constructor() { }

  ngOnInit() {
  }

}
