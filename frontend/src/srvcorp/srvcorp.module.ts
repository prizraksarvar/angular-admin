import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table/table.component";
import {ColumnComponent} from "./column/column.component";
import {TableBodyDirective} from "./table/table-body.directive";
import {TableHeaderDirective} from "./table/table-header.directive";
import {ColumnHeaderComponent} from "./column-header/column-header.component";
import {ColumnBodyComponent} from "./column-body/column-body.component";
import {RowComponent} from "./row/row.component";
import {RowDirective} from "./row/row.directive";
import {RowHeaderComponent} from "./row-header/row-header.component";
import {RowHeaderDirective} from "./row-header/row-header.directive";
import {HeaderComponent} from "./header/header.component";
import {CellComponent} from "./cell/cell.component";
import {HeaderDirective} from "./column/header.directive";
import {CellDirective} from "./column/cell.directive";
import {ColumnHeaderDirective} from "./column-header/column-header.directive";
import {ColumnBodyDirective} from "./column-body/column-body.directive";

@NgModule({
  declarations: [
    TableComponent,
    ColumnComponent,
    ColumnHeaderComponent,
    ColumnBodyComponent,
    RowComponent,
    RowHeaderComponent,
    TableBodyDirective,
    TableHeaderDirective,
    RowDirective,
    RowHeaderDirective,
    HeaderComponent,
    CellComponent,
    HeaderDirective,
    CellDirective,
    ColumnHeaderDirective,
    ColumnBodyDirective
  ],
  exports: [
    TableComponent,
    ColumnComponent,
    HeaderComponent,
    CellComponent,
    HeaderDirective,
    CellDirective
  ],
  entryComponents: [
    ColumnHeaderComponent,
    ColumnBodyComponent,
    RowComponent,
    RowHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SrvcorpModule { }
