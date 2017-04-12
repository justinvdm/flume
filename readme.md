# flume-js

[![Build Status](https://travis-ci.org/justinvdm/flume-core.svg?branch=master)](https://travis-ci.org/justinvdm/flume)

> define event-prone applications as a tree of functions

**note** flume is more of an experiment at this point, don't use in it production and expect the api to change drastically. The current documentation also leaves much to be desired. If this experiment sees some success, better documentation on what flume is and how it can be used can be expected.

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

## overview

### what is flume?
flume is an attempt at a library for defining your applications as a set of inputs and transformations of those inputs.

To some limited degree, it is along the same lines as [Observables](https://github.com/tc39/proposal-observable) and libraries like [rxjs](https://github.com/ReactiveX/rxjs) and [xstream](http://staltz.com/xstream/).


### main design goals
- constrain applications to statically defined graph of inputs and transformations
- support defining of message types (e.g. values, errors, types of side effects, custom)

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

## api

### core api

#### `input()`

#### `create(graphDef)`

#### `graph.dispatch(src, value)`

#### `except(fn)`

#### `nil`

#### `message(type, value)`

#### `trap(processorDef)`

### processor utility library

#### `map(fn)`

#### `filter([fn])`

#### `sink(initFn, processFn)`

#### `strsplit(sep)`

### internal utilities

#### `maybeAsync(fn)`

#### `resolveSeq(values)`

#### `conj(...objects)`
