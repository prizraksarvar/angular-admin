import {Component, ComponentFactoryResolver, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {DataType} from "../utils/data-type";
import {TableHeaderDirective} from "../table/table-header.directive";
import {RowDirective} from "./row.directive";
import {ColumnComponent} from "../column/column.component";
import {ColumnHeaderComponent} from "../column-header/column-header.component";
import {ColumnBodyComponent} from "../column-body/column-body.component";

@Component({
  selector: 'tr[srvcorp-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input() columns: QueryList<ColumnComponent>;
  @Input() dataItem: any;
  @ViewChild(RowDirective) rowHost: RowDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    let bodyColumnFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnBodyComponent);

    let rowRef = this.rowHost.elementRef;
    rowRef.clear();
    this.columns.forEach((item,index,array)=>{
      let bodyColumn = rowRef.createComponent(bodyColumnFactory);
      bodyColumn.instance.value = this.dataItem[item.field];
      bodyColumn.instance.dataType = item.dataType;
    });
  }
}
