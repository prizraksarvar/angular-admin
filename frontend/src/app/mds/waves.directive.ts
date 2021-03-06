import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '.waves-effect'
})
export class WavesDirective {
  private static duration = 750;
  private touches:number=-1;
  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor = 'yellow';
    //el.nativeElement.className += ' ';
  }

  @HostListener('mousedown',['$event'])
  @HostListener('touchstart',['$event']) onTouchStart(e) {
    this.show(e);
  }

  @HostListener('mouseup',['$event'])
  @HostListener('touchend',['$event'])
  @HostListener('touchcancel',['$event'])
  @HostListener('mouseleave',['$event'])
  @HostListener('dragend',['$event']) onTouchEnd(e) {
    this.hide(e);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private show(e) {
    // Disable right click
    if (e.button === 2) {
      return false;
    }

    var el = this.el.nativeElement;

    // Create ripple
    var ripple = document.createElement('div');
    ripple.className = 'waves-ripple';
    el.appendChild(ripple);

    // Get click coordinate and element witdh
    var pos         = WavesDirective.offset(el);
    var relativeY   = (e.pageY - pos.top);
    var relativeX   = (e.pageX - pos.left);
    var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

    // Support for touch devices
    if ('touches' in e) {
      relativeY   = (e.touches[0].pageY - pos.top);
      relativeX   = (e.touches[0].pageX - pos.left);
    }

    // Attach data to element
    ripple.setAttribute('data-hold', Date.now().toString());
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-x', relativeX.toString());
    ripple.setAttribute('data-y', relativeY.toString());

    // Set ripple position
    var rippleStyle = {
      'top': relativeY+'px',
      'left': relativeX+'px'
    };

    ripple.className = ripple.className + ' waves-notransition';
    ripple.setAttribute('style', WavesDirective.convertStyle(rippleStyle));
    ripple.className = ripple.className.replace('waves-notransition', '');

    // Scale the ripple
    rippleStyle['-webkit-transform'] = scale;
    rippleStyle['-moz-transform'] = scale;
    rippleStyle['-ms-transform'] = scale;
    rippleStyle['-o-transform'] = scale;
    rippleStyle['transform'] = scale;
    rippleStyle['opacity']   = '1';

    rippleStyle['-webkit-transition-duration'] = WavesDirective.duration + 'ms';
    rippleStyle['-moz-transition-duration']    = WavesDirective.duration + 'ms';
    rippleStyle['-o-transition-duration']      = WavesDirective.duration + 'ms';
    rippleStyle['transition-duration']         = WavesDirective.duration + 'ms';

    rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

    ripple.setAttribute('style', WavesDirective.convertStyle(rippleStyle));
  }

  private hide(e) {
    this.touchup(e);

    var el = this.el.nativeElement;
    var width = el.clientWidth * 1.4;

    // Get first ripple
    var ripple = null;
    var ripples = el.getElementsByClassName('waves-ripple');
    if (ripples.length > 0) {
      ripple = ripples[ripples.length - 1];
    } else {
      return false;
    }

    var relativeX   = ripple.getAttribute('data-x');
    var relativeY   = ripple.getAttribute('data-y');
    var scale       = ripple.getAttribute('data-scale');

    // Get delay beetween mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    // Fade out ripple after delay
    setTimeout(function() {
      var style = {
        'top': relativeY+'px',
        'left': relativeX+'px',
        'opacity': '0',

        // Duration
        '-webkit-transition-duration': WavesDirective.duration + 'ms',
        '-moz-transition-duration': WavesDirective.duration + 'ms',
        '-o-transition-duration': WavesDirective.duration + 'ms',
        'transition-duration': WavesDirective.duration + 'ms',
        '-webkit-transform': scale,
        '-moz-transform': scale,
        '-ms-transform': scale,
        '-o-transform': scale,
        'transform': scale,
      };

      ripple.setAttribute('style', WavesDirective.convertStyle(style));

      setTimeout(function() {
        try {
          el.removeChild(ripple);
        } catch(e) {
          return false;
        }
      }, WavesDirective.duration);
    }, delay);
  }

  private static convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += (a + ':' + obj[a] + ';');
      }
    }

    return style;
  }

  private static offset(elem) {
    var docElem, win,
      box = {top: 0, left: 0},
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = WavesDirective.getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  private static getWindow(elem) {
    return WavesDirective.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  private static isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  private allowEvent(e) {
    var allow = true;

    if (e.type === 'touchstart') {
      this.touches += 1; //push
    } else if (e.type === 'touchend' || e.type === 'touchcancel') {
      setTimeout((function() {
        if (this.touches > 0) {
          this.touches -= 1; //pop after 500ms
        }
      }).bind(this), 500);
    } else if (e.type === 'mousedown' && this.touches > 0) {
      allow = false;
    }

    return allow;
  }

  private touchup(e) {
    this.allowEvent(e);
  }
}
