import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren, HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import {TableHeaderDirective} from "./table-header.directive";
import {TableBodyDirective} from "./table-body.directive";
import {ColumnComponent} from "../column/column.component";
import {ColumnHeaderComponent} from "../column-header/column-header.component";
import {ColumnBodyComponent} from "../column-body/column-body.component";
import {RowComponent} from "../row/row.component";
import {RowHeaderComponent} from "../row-header/row-header.component";
import {rowBacklightAnimation} from "../animations/row-backlight.animation";
import {RowState} from "../entities/row-state";
import {MouseButtonState, MouseState} from "../entities/mouse-state";
import {CellState} from "../entities/cell-state";
import {cellBacklightAnimation} from "../animations/cell-backlight.animation";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'srvcorp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [rowBacklightAnimation, cellBacklightAnimation]
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() data: any[];
  @Input() columnCount: number;
  @ViewChild(TableHeaderDirective) headerHost: TableHeaderDirective;
  @ViewChild(TableBodyDirective) bodyHost: TableBodyDirective;
  @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
  rowsStates: RowState[];
  cellsStates: CellState[][];
  mouseState: MouseState = new MouseState();
  rowSelectState:boolean = false;
  rowSelectStartIndex:number = -1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.rowsStates = [];
    this.cellsStates = [];
    this.data.forEach((dataItem, i, ar) => {
      let cellsRow = [];
      for(let i=0;i<this.columnCount; i++) {
        cellsRow.push(new CellState());
      }
      this.cellsStates.push(cellsRow);
      this.rowsStates.push(new RowState());
    });
  }

  ngAfterContentInit(): void {
    //this.loadComponent();
  }

  getRowStateName(index:number):string {
    let row = this.rowsStates[index];
    if (row.checked) {
      return 'checked';
    } else if (row.active) {
      return 'active';
    } else if (row.hover) {
      return 'hover';
    }
    return 'clear';
  }

  getCellStateName(rowIndex:number, cellIndex:number):string {
    let cell = this.cellsStates[rowIndex][cellIndex];
    if (cell.active) {
      return 'active';
    } else if (cell.selected) {
      return 'selected';
    } else if (cell.hover) {
      return 'hover';
    }
    return 'clear';
  }

  rowMouseEnter(event, index:number) {
    this.mouseStateUpdate(event);
    this.rowsStates[index].hover=true;
    if (this.getMouseFirstButtonState(event)) {
      if ( index!=this.rowSelectStartIndex) {
        let i = 0;
        if (this.rowSelectStartIndex > index) {
          i = 1;
        } else if (this.rowSelectStartIndex < index) {
          i = -1;
        }
        this.rowsStates[index+i].checked = this.rowSelectState;
      }
      this.rowsStates[index].checked = this.rowSelectState;
    }
  }

  rowMouseLeave(event, index:number) {
    this.mouseStateUpdate(event);
    this.rowsStates[index].hover=false;
    if (this.getMouseFirstButtonState(event) && index!=this.rowSelectStartIndex) {
      this.rowsStates[index].checked = !this.rowSelectState;
    }
  }

  rowMouseDown(event, index:number) {
    this.mouseStateUpdate(event);
    if (this.getMouseFirstButtonState(event)) {
      this.rowSelectStartIndex = index;
      this.rowSelectState = !this.rowsStates[index].checked;
      this.freeRowsCheckState();
      this.rowsStates[index].checked = this.rowSelectState;
    }
  }

  rowMouseUp(event, index:number) {
    this.mouseStateUpdate(event);
  }

  cellMouseEnter(event, rowIndex:number, cellIndex:number) {
    this.rowMouseEnter(event,rowIndex);
    this.cellsStates[rowIndex][cellIndex].hover=true;
  }

  cellMouseLeave(event, rowIndex:number, cellIndex:number) {
    this.rowMouseLeave(event,rowIndex);
    this.cellsStates[rowIndex][cellIndex].hover=false;
  }

  cellMouseDown(event, rowIndex:number, cellIndex:number) {
    //this.rowMouseDown(event,rowIndex);
    if (this.getMouseFirstButtonState(event)) {
      this.freeCellsActiveState();
      if (this.columns.toArray()[cellIndex].editable) {
        this.cellsStates[rowIndex][cellIndex].active = true;
      }
    }
  }

  cellMouseUp(event, rowIndex:number, cellIndex:number) {
    //this.rowMouseUp(event,rowIndex);
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event){
    this.mouseStateUpdate(event);
    this.rowSelectStartIndex = -1;
  }

  private mouseStateUpdate(event) {
    if (this.getMouseFirstButtonState(event)) {
      this.mouseState.firstButton = MouseButtonState.pressed;
    } else {
      this.mouseState.firstButton = MouseButtonState.free;
    }
    if (this.getMouseSecondButtonState(event)) {
      this.mouseState.secondButton = MouseButtonState.pressed;
    } else {
      this.mouseState.secondButton = MouseButtonState.free;
    }
    if (this.getMouseThirdButtonState(event)) {
      this.mouseState.thirdButton = MouseButtonState.pressed;
    } else {
      this.mouseState.thirdButton = MouseButtonState.free;
    }
  }

  private getMouseFirstButtonState(event) {
    return (event.buttons & 1) == 1;
  }

  private getMouseSecondButtonState(event) {
    return (event.buttons & 2) == 1;
  }

  private getMouseThirdButtonState(event) {
    return (event.buttons & 3) == 1;
  }

  private freeRowsCheckState() {
    this.rowsStates.forEach((rowState)=>{
      rowState.checked = false;
    });
  }

  private freeRowsActiveState() {
    this.rowsStates.forEach((rowState)=>{
      rowState.active = false;
    });
  }

  private freeCellsActiveState() {
    this.cellsStates.forEach((row)=>{
      row.forEach((cellState)=>{
        cellState.active = false;
      });
    });
  }

  /**
   * @deprecated
   */
  private loadComponent() {
    let headerColumnFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnHeaderComponent);
    let bodyColumnFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnBodyComponent);
    let rowFactory = this.componentFactoryResolver.resolveComponentFactory(RowComponent);
    let rowHeaderFactory = this.componentFactoryResolver.resolveComponentFactory(RowHeaderComponent);

    let headerRef = this.headerHost.elementRef;
    let bodyRef = this.bodyHost.elementRef;
    headerRef.clear();
    bodyRef.clear();
    let rowHeader = headerRef.createComponent(rowHeaderFactory);
    rowHeader.instance.columns = this.columns;
    this.data.forEach((dataItem, i, ar) => {
      let row = bodyRef.createComponent(rowFactory);
      row.instance.dataItem = dataItem;
      row.instance.columns = this.columns;
    });
  }
}
