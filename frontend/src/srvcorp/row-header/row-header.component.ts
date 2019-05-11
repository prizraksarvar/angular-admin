import {Component, ComponentFactoryResolver, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {DataType} from "../utils/data-type";
import {TableHeaderDirective} from "../table/table-header.directive";
import {RowHeaderDirective} from "./row-header.directive";
import {ColumnComponent} from "../column/column.component";
import {ColumnHeaderComponent} from "../column-header/column-header.component";
import {ColumnBodyComponent} from "../column-body/column-body.component";

@Component({
  selector: 'tr[srvcorp-row-header]',
  templateUrl: './row-header.component.html',
  styleUrls: ['./row-header.component.css']
})
export class RowHeaderComponent implements OnInit {
  @Input() columns: QueryList<ColumnComponent>;
  @ViewChild(RowHeaderDirective) rowHost: RowHeaderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    let headerColumnFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnHeaderComponent);

    let rowRef = this.rowHost.elementRef;
    rowRef.clear();
    this.columns.forEach((item,index,array)=>{
      let headerColumn = rowRef.createComponent(headerColumnFactory);
      headerColumn.instance.value = item.title;
    });
  }
}
