import ScrollInto from "..";
import { render } from "@testing-library/react";
import React, { createRef } from "react";

test("ScrollInto renders with children", () => {
  const component = render(
    <ScrollInto selector="#test">
      <div>Some child content</div>
    </ScrollInto>
  );

  expect(component).toMatchSnapshot();
});

test("ScrollInto renders with custom className", () => {
  const component = render(
    <ScrollInto selector="#test" className="custom-class">
      <div>Some child content</div>
    </ScrollInto>
  );

  expect(component).toMatchSnapshot();
});

test("ScrollInto renders with ref", () => {
  const ref = createRef();

  const component = render(
    <ScrollInto scrollRef={ref}>
      <div ref={ref}>Some child content</div>
    </ScrollInto>
  );

  expect(component).toMatchSnapshot();
});

test("ScrollInto renders with scrollOptions", () => {
  const ref = createRef();

  const component = render(
    <ScrollInto
      scrollRef={ref}
      scrollOptions={{ block: "center", behavior: "smooth" }}
    >
      <div ref={ref}>Some child content</div>
    </ScrollInto>
  );

  expect(component).toMatchSnapshot();
});

test("ScrollInto renders with isScrollable", () => {
  const ref = createRef();

  const component = render(
    <ScrollInto
      scrollRef={ref}
      isScrollable={false}
      scrollOptions={{ block: "center", behavior: "smooth" }}
    >
      <div ref={ref}>Some child content</div>
    </ScrollInto>
  );

  expect(component).toMatchSnapshot();
});

test("ScrollInto renders with target", () => {
  const ref = createRef();
  const targetRef = createRef();

  const component = render(
    <ScrollInto
      scrollRef={ref}
      isScrollable={false}
      target={targetRef}
      scrollOptions={{ block: "center", behavior: "smooth" }}
    >
      <div ref={targetRef}>
        Some child content<div ref={ref}>Some child content</div>
      </div>
    </ScrollInto>
  );

  expect(component).toMatchSnapshot();
});
