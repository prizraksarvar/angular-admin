import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table/table.component";
import {ColumnComponent} from "./column/column.component";

@NgModule({
  declarations: [
    TableComponent,
    ColumnComponent
  ],
  exports: [
    TableComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SrvcorpModule { }
