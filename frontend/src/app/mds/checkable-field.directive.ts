import {Directive, ElementRef} from '@angular/core';
import {DomHelper} from "./dom-helper";

@Directive({
  selector: 'input[type=radio], input[type=checkbox]'
})
export class CheckableFieldDirective {
  onBlurBound;
  constructor(private el: ElementRef) {
    const TAB_KEY = 9;
    this.onBlurBound = this.onBlur.bind(this);
    document.addEventListener('keyup', (e) => {
      if (e.which !== TAB_KEY || e.target!==this.el.nativeElement)
        return;
      DomHelper.addClass(this.el.nativeElement,'tabbed');
      this.el.nativeElement.addEventListener('blur',this.onBlurBound,true);
    });
    /*document.addEventListener('focus',(e) => {
      console.log(e.target);
      console.log(e.currentTarget);
      if (e.target !== this.el.nativeElement && e.currentTarget !== this.el.nativeElement)
        return;
      if (e.target === this.el.nativeElement) {
        DomHelper.addClass(this.el.nativeElement,'tabbed');
      } else {
        DomHelper.removeClass(this.el.nativeElement,'tabbed');
      }
    },true);*/
  }

  private onBlur() {
    DomHelper.removeClass(this.el.nativeElement,'tabbed');
    this.el.nativeElement.removeEventListener('blur',this.onBlurBound);
  }
}
