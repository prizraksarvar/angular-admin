import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";


export class CellBacklightAnimation {
  protected timings: string = '50ms ease-out';
  protected backgroundColorDefault: string = '#ffffff00';
  protected backgroundColorHover: string = '#ededed';
  protected backgroundColorSelected: string = '#fffdbf';
  protected backgroundColorActive: string = '#fbfbfb';
  protected borderColorActive: string = '#ffd500';

  protected border = '2px solid ';

  static build() {
    let a = new this();
    return trigger('cellBacklightToggle', [
      state('clear', style({
        backgroundColor: a.backgroundColorDefault
      })),
      state('hover', style({
        backgroundColor: a.backgroundColorHover
      })),
      state('active', style({
        backgroundColor: a.backgroundColorActive,
        border: a.border+a.borderColorActive,
        padding: 0
      })),
      state('selected', style({
        backgroundColor: a.backgroundColorSelected
      })),
      /*transition('* <=> *', [
        animate(a.timings)
      ]),*/
    ]);
  }
}

export const cellBacklightAnimation = CellBacklightAnimation.build();

