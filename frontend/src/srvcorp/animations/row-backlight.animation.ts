import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";


export class RowBacklightAnimation {
  protected timings: string = '50ms ease-out';
  protected backgroundColorDefault: string = 'white';
  protected backgroundColorHover: string = '#ededed';
  protected backgroundColorActive: string = '#e5e5e5';
  protected backgroundColorChecked: string = '#fffd83';

  static build() {
    let a = new this();
    return trigger('rowBacklightToggle', [
      state('clear', style({
        backgroundColor: a.backgroundColorDefault
      })),
      state('hover', style({
        backgroundColor: a.backgroundColorHover
      })),
      state('active', style({
        backgroundColor: a.backgroundColorActive
      })),
      state('checked', style({
        backgroundColor: a.backgroundColorChecked
      })),
      /*transition('* <=> *', [
        animate(a.timings)
      ]),*/
    ]);
  }
}

export const rowBacklightAnimation = RowBacklightAnimation.build();

