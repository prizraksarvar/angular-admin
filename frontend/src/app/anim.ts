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

import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";
import {ToggleListItemShowAnimation} from "./toggle-list-item-show.animation";


export class AnimtestToggleListItemShowAnimation extends ToggleListItemShowAnimation {
    protected itemChildrenListStates() {
        return [
            query('.test-card-animate-hidden', [style(this.itemChilderHiddenState())]),
            query('.test-card-animate-logo', [style(this.itemLogoListState())]),
            query('.test-card-animate-name', [style(this.itemNameListState())]),
        ];
    }

    protected itemChildrenCartStates() {
        return [
            query('.test-card-animate-hidden', [style(this.itemChilderHiddenState())]),
            query('.test-card-animate-logo', [style(this.itemLogoCartState())]),
            query('.test-card-animate-name', [style(this.itemNameCartState())]),
        ];
    }

    protected itemChildrenToCartAnimations() {
        return [
            query('.test-card-animate-logo', [
                animate(this.timings, style(this.itemLogoCartState())),
            ]),
            query('.test-card-animate-name', [
                animate(this.timings, style(this.itemNameCartState()))
            ]),
        ];
    }

    protected itemChildrenToListAnimations() {
        return [
            query('.test-card-animate-logo', [
                animate(this.timings, style(this.itemLogoListState())),
            ]),
            query('.test-card-animate-name', [
                animate(this.timings, style(this.itemNameListState())),
            ]),
        ];
    }

    protected itemChilderHiddenState() {
        return {opacity: 0};
    }

    protected itemLogoListState() {
        return {
            width: '40px',
            height: '40px',
            'vertical-align': 'top',
            margin: '12px 12px 12px 45px',
        };
    }

    protected itemNameListState() {
        return {
            position: 'absolute',
            top: '12px',
            left: '110px',
            'font-size': '1rem',
            'font-weight': '400',
            'line-height': '1.5',
            color: '#212529',
        };
    }

    protected itemLogoCartState() {
        return {
            width: '150px',
            height: '150px',
            margin: '0',
        };
    }

    protected itemNameCartState() {
        return {
            top: '150px',
            left: '0px',
            margin: '0 0 .5rem 0',
            'vertical-align': 'top',
            'font-size': '2.5rem',
            'font-weight': '500',
            'line-height': '1.2',
            color: '#212529',
        };
    }
}

export const animtestToggleListItemShowAnimation = AnimtestToggleListItemShowAnimation.build();

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

