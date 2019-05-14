import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";


export class ToggleMenuShowAnimation {
    protected timings: string = '150ms ease-out';
    static build() {
        let a = new this();
        return trigger('toggleMenuShow', [
            a.itemShow(),
            a.itemHide(),
        ]);
    }

    protected itemShow() {
        return transition('closed => opened', [
            query(':enter', [style(this.defaultInitState())]),
            query(':enter', [
                style(this.itemClosedState()),
            ]),
            query(':enter', this.itemChildrenClosedStates()),
            group([
                query(':enter', [
                    animate(this.timings, style(this.itemOpenedState())),
                ]),
                query(':enter', [group(this.itemChildrenToOpenAnimations())])
            ]),
            query(':enter', animateChild()),
        ]);
    }

    protected itemHide() {
        return transition('opened => closed', [
            query(':leave', [style(this.defaultInitState())]),
            query(':leave', [style(this.itemOpenedState()),]),
            query(':leave', this.itemChildrenOpenedStates()),
            group([
                query(':leave', [group(this.itemChildrenToCloseAnimations())]),
                query(':leave', [
                    animate(this.timings, style(this.itemClosedState())),
                ]),
            ]),
        ]);
    }

    protected defaultInitState() {
        return {};
    }

    protected itemClosedState() {
        return {};
    }

    protected itemOpenedState() {
        return {};
    }

    protected itemChildrenClosedStates() {
        return [
            query('.app-test-menu__overlay', [style(this.itemOverlayClosedState())]),
            query('.app-test-menu__block', [style(this.itemMenuClosedState())]),
        ];
    }

    protected itemChildrenOpenedStates() {
        return [
            query('.app-test-menu__overlay', [style(this.itemOverlayOpenedState())]),
            query('.app-test-menu__block', [style(this.itemMenuOpenedState())]),
        ];
    }

    protected itemChildrenToOpenAnimations() {
        return [
            query('.app-test-menu__overlay', [animate(this.timings,style(this.itemOverlayOpenedState()))]),
            query('.app-test-menu__block', [animate(this.timings,style(this.itemMenuOpenedState()))]),
        ];
    }

    protected itemChildrenToCloseAnimations() {
        return [
            query('.app-test-menu__overlay', [animate(this.timings,style(this.itemOverlayClosedState()))]),
            query('.app-test-menu__block', [animate(this.timings,style(this.itemMenuClosedState()))]),
        ];
    }

    protected itemOverlayClosedState() {
        return {opacity: 0};
    }

    protected itemOverlayOpenedState() {
        return {opacity: 0.3};
    }

    protected itemMenuClosedState() {
        return {right: '-300px'};
    }

    protected itemMenuOpenedState() {
        return {right: '0'};
    }
}

export const toggleMenuShowAnimation = ToggleMenuShowAnimation.build();

