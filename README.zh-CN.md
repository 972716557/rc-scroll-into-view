
当某一个节点还没有渲染出来，但这个时候又调用了js 原生的scrollIntoView；或者这个节点已经生成，方法也成功调用，但是又被其他晚加载的元素顶掉了，导致scrollIntoView失效。这个库就是用来解决这种情况，妈妈再也不用担心scrollIntoView失效了！！！  [rc-scroll-into-view](https://github.com/972716557/rc-scroll-into-view).

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

## 使用 selector

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

## 使用 ref

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

## 使用 target

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
      scrollOptions={{ block: 'center', behavior: 'smooth' }}
    >
      <div ref={targetRef}>
        这是另一个child
        <div ref={ref}>child</div>
      </div>
    </ScrollInto>
  );
};
export default App;
```

## API

| 属性 | 说明 | 类型 | 默认值 |  版本 |
| --- | --- | --- | --- | --- |
| selector | 需要滚动的选择器字段 | `string` | -- | 1.0.0 |
| scrollOptions | [滚动属性配置](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView) | `ScrollIntoViewOptions` | -- | 1.0.0 |
| isScrollable | 是否需要滚动 | `boolean` | -- | 1.0.0 |
| scrollRef | 需要滚动的元素的 ref | `MutableRefObject<HTMLElement \| null>` | -- | 1.0.0 |
| target | 父节点：用来判断什么时候停止监听页面是否发生改变 | `Element` \| `() => Element` \| `MutableRefObject<Element>` | `document` | 1.0.0 |

