import {Directive, ElementRef} from '@angular/core';
import {DomHelper} from "./dom-helper";

@Directive({
  selector: 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea'
})
export class TextFieldDirective {
  private observer;
  private label;
  constructor(private el: ElementRef) {
    this.observer = new MutationObserver((mutations, observer)=>{
      if (this.el.nativeElement.nextSibling.tagName !== 'LABEL')
        return;
      this.label = this.el.nativeElement.nextSibling;
      this.update();
      document.addEventListener('focus',(e) => {
        if (e.target !== this.el.nativeElement && e.currentTarget !== this.el.nativeElement)
          return;
        this.update();
      },true);
      this.el.nativeElement.addEventListener('blur',(e) => {
        this.update();
      },true);
      this.el.nativeElement.addEventListener('change',this.update.bind(this));
      this.el.nativeElement.addEventListener('reset',this.update.bind(this));
      observer.disconnect();
    });
    this.observer.observe(this.el.nativeElement.parentNode,{childList: true});
  }

  private update() {
    if (
      this.el.nativeElement.value.length > 0 ||
      this.el.nativeElement === document.activeElement ||
      this.el.nativeElement.autofocus ||
      this.el.nativeElement.hasAttribute('placeholder')
    ) {
      DomHelper.addClass(this.label,'active');
    } else if (this.el.nativeElement.validity) {
      DomHelper.toggleClass(this.label,'active', this.el.nativeElement.validity.badInput === true);
    } else {
      DomHelper.removeClass(this.label,'active');
    }
  }
}
