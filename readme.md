# flume-js

[![Build Status](https://travis-ci.org/justinvdm/flume-core.svg?branch=master)](https://travis-ci.org/justinvdm/flume)

> define event-prone applications as a tree of functions

```js
import {create, input, map, reduce} from 'flume-js';

const src1 = input();
const src2 = input();

const a = [src1]
  .concat(map(v => v * 2));

const b = [src2]
  .concat(map(v => v * 3));

const graph = [[a, b]]
  .concat(reduce(() => 1, (total, v) => total + v))
  .concat(map(console.log));

create(graph)
  .dispatch(src1, 1)   // 3
  .dispatch(src2, 2)   // 9
  .dispatch(src1, 3);  // 15
```

```
Sorry about the lack of documentation, I know its really not great. Will add this as soon as I can.
```

## install

```
$ npm i -S flume-js
```

## usage

At the moment, flume can be used in with es2015-module-aware bundlers and commonjs environments:

```js
// example using commonjs
const flume = require('flume-js');

// example using es2015-aware bundlers
import {create, input, map, reduce} from 'flume-js';
```
