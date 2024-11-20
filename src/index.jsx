import { useDebounceEffect, useSize } from "ahooks";
import { useEffect, useRef, useState } from "react";
import getTarget from "./getTarget";

const ScrollInto = ({
  children,
  selector,
  scrollOptions = {},
  isScrollable: _isScrollable,
  scrollRef,
  target,
  ...rest
}) => {
  const el = getTarget(target, document);

  const scrollIntoView = () => {
    if (selector) {
      const element = document.querySelector(selector);
      element?.scrollIntoView(scrollOptions);
      return;
    }
    if (scrollRef && scrollRef?.current) {
      scrollRef.current?.scrollIntoView(scrollOptions);
    }
  };

  const ref = useRef(null);
  const size = useSize(ref);
  const [isScrollable, setIsScrollable] = useState(_isScrollable ?? true);

  const cancelObserve = () => {
    setIsScrollable(false);
  };

  useEffect(() => {
    if (_isScrollable !== undefined) {
      setIsScrollable(_isScrollable);
    }
  }, [_isScrollable]);

  useDebounceEffect(
    () => {
      if (isScrollable) {
        scrollIntoView();
      }
    },
    [size, isScrollable],
    { wait: 300 }
  );

  useEffect(() => {
    if (isScrollable && el) {
      el.addEventListener("scroll", cancelObserve);
      el.addEventListener("click", cancelObserve);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", cancelObserve);
        el.removeEventListener("click", cancelObserve);
      }
    };
  }, []);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};

export default ScrollInto;
