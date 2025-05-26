import { useDebounceEffect, useSize } from "ahooks";
import type { MutableRefObject } from "react";
import React, { useEffect, useRef, useState, HTMLAttributes, FC } from "react";
import getTarget from "./getTarget";

type TargetType = HTMLElement | Element | Window | Document;

type TargetValue<T> = T | undefined | null;

export type BasicTarget<T extends TargetType = Element> =
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;
export interface ScrollIntoViewProps extends HTMLAttributes<HTMLElement> {
  selector?: string;
  scrollOptions?: ScrollIntoViewOptions;
  isScrollable?: boolean;
  scrollRef?: MutableRefObject<HTMLElement | null>;
  target?: BasicTarget<Element | Document>;
}

const ScrollInto: FC<ScrollIntoViewProps> = ({
  children,
  selector,
  scrollOptions = {},
  isScrollable: _isScrollable = true,
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
  const [isScrollable, setIsScrollable] = useState(_isScrollable);

  const cancelObserve = () => {
    setIsScrollable(false);
  };

  useEffect(() => {
    if (typeof _isScrollable === "undefined") {
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
