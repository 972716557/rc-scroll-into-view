import ScrollInto from "..";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useRef, useState } from "react";
import "@testing-library/jest-dom";

describe("RCScrollIntoView", () => {
  const scrollIntoViewMock = jest.fn();
  beforeEach(() => {
    window.innerHeight = 800;
    window.innerWidth = 800;
    jest.restoreAllMocks();

    // 每次测试前重置 Mock
    scrollIntoViewMock.mockClear();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  test("ScrollInto render", async () => {
    const Component = () => {
      return (
        <ScrollInto selector="#test">
          <div style={{ height: 2000, background: "black" }}>
            <div id="test" data-testid="target-element">
              content
            </div>
            <div style={{ height: 1000, background: "yellow" }}></div>
          </div>
        </ScrollInto>
      );
    };
    render(<Component />);

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  test("ScrollInto renders with isScrollable", async () => {
    const Component = () => {
      const [isScrollable, setIsScrollable] = useState(false);
      const onClick = () => {
        setIsScrollable(true);
      };
      return (
        <ScrollInto selector="#test" isScrollable={isScrollable}>
          <div style={{ height: 2000, background: "black" }}>
            <button onClick={onClick} data-testid="button">
              Click Me
            </button>
            <div id="test" data-testid="target-element">
              content
            </div>
            <div style={{ height: 1000, background: "yellow" }}></div>
          </div>
        </ScrollInto>
      );
    };
    render(<Component />);
    const button = screen.getByTestId("button");
    await waitFor(() => {
      expect(scrollIntoViewMock).not.toHaveBeenCalled();
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  test("ScrollInto renders with id selector", async () => {
    const Component = () => {
      return (
        <ScrollInto selector="#test">
          <div style={{ height: 1000, background: "black" }}></div>
          <div id="test" data-testid="target-element">
            Some child content
          </div>
          <div style={{ height: 1000, background: "yellow" }}></div>
        </ScrollInto>
      );
    };
    render(<Component />);
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  test("ScrollInto renders with class selector", async () => {
    const Component = () => {
      return (
        <ScrollInto selector=".test">
          <div style={{ height: 1000, background: "black" }}></div>
          <div className="test" data-testid="target-element">
            Some child content
          </div>
          <div style={{ height: 1000, background: "yellow" }}></div>
        </ScrollInto>
      );
    };
    render(<Component />);
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  test("ScrollInto renders without element", async () => {
    const Component = () => {
      return (
        <ScrollInto selector="withoutTheElement">
          <div style={{ height: 1000, background: "black" }}></div>
          <div className=".test" data-testid="target-element">
            Some child content
          </div>
          <div style={{ height: 1000, background: "yellow" }}></div>
        </ScrollInto>
      );
    };
    render(<Component />);
    await waitFor(() => {
      expect(scrollIntoViewMock).not.toHaveBeenCalled();
    });
  });

  test("ScrollInto renders with ref", async () => {
    const Component = () => {
      const ref = useRef();

      return (
        <ScrollInto
          scrollRef={ref}
          scrollOptions={{ block: "center", behavior: "smooth" }}
        >
          <div style={{ height: 1000, background: "black" }}></div>
          <div ref={ref}>ScrollInto renders with scrollOptions</div>
          <div style={{ height: 1000, background: "yellow" }}></div>
        </ScrollInto>
      );
    };

    render(<Component />);

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  test("ScrollInto renders with scrollOptions", async () => {
    const Component = () => {
      const ref = useRef();

      return (
        <ScrollInto
          scrollRef={ref}
          scrollOptions={{ block: "center", behavior: "smooth" }}
        >
          <div style={{ height: 1000, background: "black" }}></div>
          <div ref={ref}>ScrollInto renders with scrollOptions</div>
          <div style={{ height: 1000, background: "yellow" }}></div>
        </ScrollInto>
      );
    };

    render(<Component />);
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        block: "center",
        behavior: "smooth",
      });
    });
  });

  test("ScrollInto renders with target", async () => {
    const Component = () => {
      const ref = useRef();
      const targetRef = useRef();
      return (
        <ScrollInto
          scrollRef={ref}
          target={targetRef}
          scrollOptions={{ block: "center", behavior: "smooth" }}
        >
          <div ref={targetRef}>
            <div style={{ height: 1000, background: "black" }}></div>
            <div ref={ref}>ScrollInto renders with target</div>
            <div style={{ height: 1000, background: "yellow" }}></div>
          </div>
        </ScrollInto>
      );
    };

    render(<Component />);

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });
});
