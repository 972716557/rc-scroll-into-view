
A thin react component wrapper bundled with the fantastic [rc-scroll-into-view](https://github.com/972716557/rc-scroll-into-view).

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



