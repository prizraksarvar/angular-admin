import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";


export class RowHoverAnimation {
    protected timings: string = '50ms ease-out';
    protected backgroundColorDefault:string = 'white';
    protected backgroundColorHover:string = '#ededed';
    static build() {
        let a = new this();
        return trigger('hoverToggle', [
            state('notHover', style({
                backgroundColor: a.backgroundColorDefault
            })),
            state('hover', style({
                backgroundColor: a.backgroundColorHover
            })),
            transition('notHover => hover', [
                animate(a.timings)
            ]),
            transition('hover => notHover', [
                animate(a.timings)
            ]),
        ]);
    }
}

export const rowHoverAnimation = RowHoverAnimation.build();

