

export class DomHelper {
  public static addClass(el,className) {
    if (!this.hasClass(el, className))
      el.classList.add(className);
  }

  public static removeClass(el,className) {
    if (this.hasClass(el, className))
      el.classList.remove(className);
  }

  public static toggleClass(el,className, force) {
    el.classList.toggle(className, force);
  }

  public static hasClass(el,className) {
    return el.classList.contains(className);
  }

  public static closest(el,className) {
    let targetElement = el; // clicked element

    do {
      if (targetElement && targetElement.classList && this.hasClass(targetElement,className)) {
        return targetElement;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);
    return null;
  }

  public static offset(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset
    };

  }

  public static escapeHash(hash) {
    return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, '\\$1');
  };

  public static checkPossibleAlignments(el, container, bounding, offset) {
    let canAlign = {
      top: true,
      right: true,
      bottom: true,
      left: true,
      spaceOnTop: null,
      spaceOnRight: null,
      spaceOnBottom: null,
      spaceOnLeft: null
    };

    let containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
    let containerRect = container.getBoundingClientRect();
    let containerHeight = Math.min(containerRect.height, window.innerHeight);
    let containerWidth = Math.min(containerRect.width, window.innerWidth);
    let elOffsetRect = el.getBoundingClientRect();

    let scrollLeft = container.scrollLeft;
    let scrollTop = container.scrollTop;

    let scrolledX = bounding.left - scrollLeft;
    let scrolledYTopEdge = bounding.top - scrollTop;
    let scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;

    // Check for container and viewport for left
    canAlign.spaceOnRight = !containerAllowsOverflow
      ? containerWidth - (scrolledX + bounding.width)
      : window.innerWidth - (elOffsetRect.left + bounding.width);
    if (canAlign.spaceOnRight < 0) {
      canAlign.left = false;
    }

    // Check for container and viewport for Right
    canAlign.spaceOnLeft = !containerAllowsOverflow
      ? scrolledX - bounding.width + elOffsetRect.width
      : elOffsetRect.right - bounding.width;
    if (canAlign.spaceOnLeft < 0) {
      canAlign.right = false;
    }

    // Check for container and viewport for Top
    canAlign.spaceOnBottom = !containerAllowsOverflow
      ? containerHeight - (scrolledYTopEdge + bounding.height + offset)
      : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
    if (canAlign.spaceOnBottom < 0) {
      canAlign.top = false;
    }

    // Check for container and viewport for Bottom
    canAlign.spaceOnTop = !containerAllowsOverflow
      ? scrolledYBottomEdge - (bounding.height - offset)
      : elOffsetRect.bottom - (bounding.height + offset);
    if (canAlign.spaceOnTop < 0) {
      canAlign.bottom = false;
    }

    return canAlign;
  }

  //TODO: move to another class, related with global functions
  public static throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    options || (options = {});
    let later = function() {
      previous = options.leading === false ? 0 : DomHelper.getTime();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      let now = DomHelper.getTime();
      if (!previous && options.leading === false) previous = now;
      let remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  //TODO: move to another class, related with global functions
  public static getTime() {
    return Date.now() || new Date().getTime();
  }

  public static getDocumentScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
}
