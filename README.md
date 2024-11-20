
When a node has not been rendered, but this time the js native scrollIntoView is called; Or the node may have been generated and the method successfully called, but it was bumped off by another late-loaded element, causing scrollIntoView to fail. This library is designed to solve this situation. Mom no longer have to worry about scrollIntoView failure!!! [rc-scroll-into-view](https://github.com/972716557/rc-scroll-into-view).

## Install

`yarn add rc-scroll-into-view`

or

`npm install rc-scroll-into-view --save`

## Usage

```js
import React, { useRef } from 'react';
import ScrollIntoView from 'rc-scroll-into-view';
const App = () => {
  const ref = useRef();
  return (
    <ScrollInto scrollRef={ref} scrollOptions={{ block: 'center', behavior: 'smooth' }}>
      <div ref={ref}>child</div>
    </ScrollInto>
  );
};
export default App;
```

## use selector

```jsx
import React from 'react';
import ScrollInto from 'rc-scroll-into-view';
const App = () => (
  <ScrollInto selector="#test" scrollOptions={{ block: 'center', behavior: 'smooth' }}>
    <div id="test">child</div>
  </ScrollInto>
);
export default App;
```

## use ref

```jsx
import React, { useRef } from 'react';
import ScrollInto from 'rc-scroll-into-view';
const App = () => {
  const ref = useRef();
  return (
    <ScrollInto scrollRef={ref} scrollOptions={{ block: 'center', behavior: 'smooth' }}>
      <div ref={ref}>child</div>
    </ScrollInto>
  );
};
export default App;
```

## use target

```jsx
import React, { useRef } from 'react';
import ScrollInto from 'rc-scroll-into-view';
const App = () => {
  const targetRef = useRef();
  const ref = useRef();
  return (
    <ScrollInto
      scrollRef={ref}
      target={targetRef}
    >
      <div ref={targetRef}>
        another child
        <div ref={ref}>child</div>
      </div>
    </ScrollInto>
  );
};
export default App;
```

## API

| Property | Description | Type | Default |  Version |
| --- | --- | --- | --- |  --- |
| selector | The scroll element you want to match | `string` | -- | 1.0.0 |
| scrollOptions | [The scrollIntoViewOptions details to see](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)   | `ScrollIntoViewOptions` | -- | 1.0.0 |
| isScrollable | Whether to scroll | `boolean` |  -- | 1.0.0 |
| scrollRef | The ref you want to scroll | `MutableRefObject<HTMLElement \| null>` | -- | 1.0.0 |
| target | The parent container is responsible for determining when it is necessary to cease monitoring the size changes of the element. | `Element` \| `() => Element` \| `MutableRefObject<Element>` | `document` | 1.0.0 |

