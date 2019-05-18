import {AfterContentInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataType} from "../utils/data-type";
import {ColumnHeaderDirective} from "../column-header/column-header.directive";
import {ColumnBodyDirective} from "./column-body.directive";

@Component({
  selector: '[srvcorpColumnBody]',
  templateUrl: './column-body.component.html',
  styleUrls: ['./column-body.component.css']
})
export class ColumnBodyComponent implements OnInit, AfterContentInit {
  @Input() value: String;
  @Input() dataType: DataType;
  @Input() customContent: TemplateRef<any>;
  @ViewChild(ColumnBodyDirective) columnBodyHost: ColumnBodyDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.loadComponent();
  }

  private loadComponent() {
    if (!this.customContent)
      return;
    let viewRef = this.columnBodyHost.elementRef;
    viewRef.clear();
    viewRef.createEmbeddedView(this.customContent,{$val:this.value});
  }
}
