import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";


export class ToggleListItemShowAnimation {
    protected timings: string = '150ms ease-out';
    static build() {
        let a = new this();
        return trigger('toggleListItemShow', [
            a.itemShow(),
            a.itemHide(),
        ]);
    }

    protected itemShow() {
        return transition('list => card', [
            style({position: 'relative'}),
            query(':enter, :leave', [style(this.defaultInitState())]),
            query(':leave', animateChild()),
            query(':enter', [
                style(this.itemListState()),
            ]),
            query(':enter', this.itemChildrenListStates()),
            query(':enter', [
                animate(this.timings, style(this.itemElevatedState())),
            ]),
            group([
                query(':enter', [
                    animate(this.timings, style(this.itemCartState())),
                ]),
                query(':enter', [group(this.itemChildrenToCartAnimations())])
            ]),
            query(':enter', animateChild()),
        ]);
    }

    protected itemHide() {
        return transition('card => list', [
            style({position: 'relative'}),
            query(':enter, :leave', [style(this.defaultInitState())]),
            query(':enter', animateChild()),
            query(':leave', [style(this.itemCartState()),]),
            query(':leave', this.itemChildrenCartStates()),
            group([
                query(':leave', [group(this.itemChildrenToListAnimations())]),
                query(':leave', [
                    animate(this.timings, style(this.itemElevatedState())),
                ]),
            ]),
            query(':leave', [
                animate(this.timings, style(this.itemListState())),
            ]),
            query(':enter', animateChild()),
        ]);
    }

    protected defaultInitState() {
        return {
            position: 'absolute',
            opacity: 1,
            width: '100%',
            background: 'white'
        };
    }

    protected itemListState() {
        return {
            opacity: 0,
            "box-shadow": 'black 0px 0px 0px 0px',
            width: '100%',
            height: '63px',
            top: '{{itemTop}}px',
            overflow: 'hidden',
        };
    }

    protected itemElevatedState() {
        return {
            opacity: 1,
            "box-shadow": 'black 0px 0px 16px 0px',
            top: '{{itemTop}}px',
            width: '100%',
            height: '63px',
        };
    }

    protected itemCartState() {
        return Object.assign(this.itemElevatedState(),{
            top: '{{pageTop}}px',
            height: '{{pageHeight}}px',
            width: '100%',
            overflow: 'hidden',
        });
    }

    protected itemChildrenListStates() {
        return [];
    }

    protected itemChildrenCartStates() {
        return [];
    }

    protected itemChildrenToCartAnimations() {
        return [];
    }

    protected itemChildrenToListAnimations() {
        return [];
    }
}

export const toggleListItemShowAnimation = ToggleListItemShowAnimation.build();

