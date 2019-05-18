import {AfterContentInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataType} from "../utils/data-type";
import {TableHeaderDirective} from "../table/table-header.directive";
import {ColumnHeaderDirective} from "./column-header.directive";

@Component({
  selector: '[srvcorpColumnHeader]',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.css']
})
export class ColumnHeaderComponent implements OnInit, AfterContentInit {
  @Input() value: String;
  @Input() customContent: TemplateRef<any>;
  @ViewChild(ColumnHeaderDirective) columnHeaderHost: ColumnHeaderDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.loadComponent();
  }

  private loadComponent() {
    if (!this.customContent)
      return;
    let viewRef = this.columnHeaderHost.elementRef;
    viewRef.clear();
    viewRef.createEmbeddedView(this.customContent);
  }
}
