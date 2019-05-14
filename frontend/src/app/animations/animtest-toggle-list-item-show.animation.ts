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

