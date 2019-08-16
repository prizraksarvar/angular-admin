import {Directive, ElementRef} from '@angular/core';
import {DomHelper} from "./dom-helper";

@Directive({
  selector: '.materialize-textarea'
})
export class TextareaFieldDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.dataset.originalHeight = this.el.nativeElement.offsetHeight;
    this.el.nativeElement.dataset.previousLength = this.el.nativeElement.value.length;
    this.autoResize();

    const f = (e) => {
      if (e.target!==this.el.nativeElement)
        return;
      this.autoResize();
    };
    document.addEventListener('keyup', f);
    document.addEventListener('keydown', f);
  }

  private autoResize() {
    //TODO: need fix resize bug
    // Textarea Auto Resize
    let hiddenDiv = document.querySelector('.hiddendiv');
    if (!hiddenDiv) {
      hiddenDiv = document.createElement('div');
      hiddenDiv.className = 'hiddendiv common';
      document.body.appendChild(hiddenDiv);
    }

    // Set font properties of hiddenDiv
    let fontFamily = this.el.nativeElement.style['font-family'];
    let fontSize = this.el.nativeElement.style['font-size'];
    let lineHeight = this.el.nativeElement.style['line-height'];

    // Firefox can't handle padding shorthand.
    let paddingTop = this.el.nativeElement.style['padding-top'];
    let paddingRight = this.el.nativeElement.style['padding-right'];
    let paddingBottom = this.el.nativeElement.style['padding-bottom'];
    let paddingLeft = this.el.nativeElement.style['padding-left'];

    if (fontSize) {
      // @ts-ignore
      hiddenDiv.style['font-size'] = fontSize;
    }
    if (fontFamily) {
      // @ts-ignore
      hiddenDiv.style['font-family'] = fontFamily;
    }
    if (lineHeight) {
      // @ts-ignore
      hiddenDiv.style['line-height']=lineHeight;
    }
    if (paddingTop) {
      // @ts-ignore
      hiddenDiv.style['padding-top']=paddingTop;
    }
    if (paddingRight) {
      // @ts-ignore
      hiddenDiv.style['padding-right']=paddingRight;
    }
    if (paddingBottom) {
      // @ts-ignore
      hiddenDiv.style['padding-bottom']=paddingBottom;
    }
    if (paddingLeft) {
      // @ts-ignore
      hiddenDiv.style['padding-left']=paddingLeft;
    }

    // Set original-height, if none
    if (!this.el.nativeElement.dataset.originalHeight) {
      this.el.nativeElement.dataset.originalHeight = this.el.nativeElement.offsetHeight;
    }

    if (this.el.nativeElement.getAttribute('wrap') === 'off') {
      // @ts-ignore
      hiddenDiv.style['overflow-wrap'] = 'normal';
      // @ts-ignore
      hiddenDiv.style['white-space']='pre';
    }

    // @ts-ignore
    hiddenDiv.innerText = this.el.nativeElement.value + '\n';
    let content = hiddenDiv.innerHTML.replace(/\n/g, '<br>');
    hiddenDiv.innerHTML = content;

    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size

    if (this.el.nativeElement.offsetWidth > 0 && this.el.nativeElement.offsetHeight > 0) {
      // @ts-ignore
      hiddenDiv.style['width'] = this.el.nativeElement.offsetWidth + 'px';
    } else {
      // @ts-ignore
      hiddenDiv.style['width'] = window.innerWidth / 2 + 'px';
    }

    /**
     * Resize if the new height is greater than the
     * original height of the textarea
     */
    if (this.el.nativeElement.dataset.originalHeight <= hiddenDiv.clientHeight) {
      this.el.nativeElement.style.height = hiddenDiv.clientHeight + 'px';
    } else if (this.el.nativeElement.value.length < this.el.nativeElement.dataset.previousLength) {
      /**
       * In case the new height is less than original height, it
       * means the textarea has less text than before
       * So we set the height to the original one
       */
      this.el.nativeElement.style['height'] = this.el.nativeElement.dataset.originalHeight + 'px';
    }
    this.el.nativeElement.dataset.previousLength = this.el.nativeElement.value.length;
  }
}
