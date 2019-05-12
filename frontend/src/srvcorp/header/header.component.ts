import {Component, ContentChild, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DataType} from "../utils/data-type";

@Component({
  selector: 'srvcorp-column',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() field: string;
  @Input() dataType: DataType;
  @Input() title: string;
  @ContentChild(HeaderComponent) header: HeaderComponent;

  constructor() { }

  ngOnInit() {
  }

}
