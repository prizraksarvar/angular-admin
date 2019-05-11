import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  Input,
  OnInit, QueryList,
  ViewChild
} from '@angular/core';
import {Menu} from "../../app/entities/menu";
import {TableHeaderDirective} from "./table-header.directive";
import {TableBodyDirective} from "./table-body.directive";
import {ColumnComponent} from "../column/column.component";
import {ColumnHeaderComponent} from "../column-header/column-header.component";
import {ColumnBodyComponent} from "../column-body/column-body.component";

@Component({
  selector: 'srvcorp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() data:any[];
  @ViewChild(TableHeaderDirective) headerHost: TableHeaderDirective;
  @ViewChild(TableBodyDirective) bodyHost: TableBodyDirective;
  @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    console.log(this.columns);
    this.loadComponent();
  }

  private loadComponent() {
    let headerColumnFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnHeaderComponent);
    let bodyColumnFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnBodyComponent);

    let headerRef = this.headerHost.elementRef;
    let bodyRef = this.bodyHost.elementRef;
    //headerRef.clear();
    //bodyRef.clear();
    console.log(headerRef);
    console.log(bodyRef);
    this.columns.forEach((item,index,array)=>{
      let headerColumn = headerRef.createComponent(headerColumnFactory);
      headerColumn.instance.value = item.field;
    });
    /*let componentRef = viewContainerRef.createComponent(componentFactory);
    (<CoreFieldView>componentRef.instance).field = this.field;
    (<CoreFieldView>componentRef.instance).value = this.value;*/
  }
}
