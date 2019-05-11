import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table/table.component";
import {ColumnComponent} from "./column/column.component";
import {TableBodyDirective} from "./table/table-body.directive";
import {TableHeaderDirective} from "./table/table-header.directive";
import {ColumnHeaderComponent} from "./column-header/column-header.component";
import {ColumnBodyComponent} from "./column-body/column-body.component";

@NgModule({
  declarations: [
    TableComponent,
    ColumnComponent,
    ColumnHeaderComponent,
    ColumnBodyComponent,
    TableBodyDirective,
    TableHeaderDirective
  ],
  exports: [
    TableComponent,
    ColumnComponent
  ],
  entryComponents: [
    ColumnHeaderComponent,
    ColumnBodyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SrvcorpModule { }
