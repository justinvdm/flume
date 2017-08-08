# flume-js

[![Build Status](https://travis-ci.org/justinvdm/flume-js.svg?branch=master)](https://travis-ci.org/justinvdm/flume-js)

> define event-prone applications as a tree of functions

**note** flume is more of an experiment at this point, don't use in it production and expect the api to change drastically. The current documentation also leaves much to be desired. If this experiment sees some success, better documentation on what flume is and how it can be used can be expected.

```js
import {create, input, map, reduce} from 'flume-js';

const src1 = input();
const src2 = input();

const a = pipe(src1, map(v => v * 2));
const b = pipe(src2, map(v => v * 3));

const graph = pipe([a, b], [
  reduce(() => 1, (total, v) => total + v),
  map(console.log)
]);

pipe(graph, [
  create
  dispatch(src1(1))  // 3
  dispatch(src2(2))  // 9
  dispatch(src1(3))  // 15
]);  
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

## overview

### what is flume?
flume is an attempt at a library for defining your applications as a set of inputs and transformations of those inputs.

To some limited degree, it is along the same lines as [Observables](https://github.com/tc39/proposal-observable) and libraries like [rxjs](https://github.com/ReactiveX/rxjs) and [xstream](http://staltz.com/xstream/).


### api overview
Applications can be thought of as pipelines. In the simplest case, we can have a single input at the top, followed by transform functions:

```js
const src = input();

const graph = pipe(src, [
  map(v => v * 2),
  map(v => v + 1),
  map(console.log)
]);

pipe(graph, [
  create,
  dispatch(src(2)),  // 5
  dispatch(src(3))  // 5
]);
```

We can also have multiple inputs at the top of the pipeline:

```js
const src1 = input();
const src2 = input();

const app = pipe([src1, src2], [
  map(v => v * 2),
  map(v => v + 1),
  map(console.log),
  create
]);

pipe(graph, [
  create,
  dispatch(src(2)),  // 5
  dispatch(src(3))  // 7
]);
```

Applications can also be defined as pipelines of pipelines:

```js
import {create, input, map, reduce} from 'flume-js';

const src1 = input();
const src2 = input();

const a = pipe(src1, map(v => v * 2));
const b = pipe(src2, map(v => v * 3));

const graph = pipe([a, b], [
  reduce(() => 1, (total, v) => total + v),
  map(console.log)
]);

pipe(graph, [
  create
  dispatch(src1(1))  // 3
  dispatch(src2(2))  // 9
  dispatch(src1(3))  // 15
]);  
```

### value propagation

### error propagation

### main design goals
- constrain applications to statically defined graph of inputs and transforms
- support defining of message types (e.g. values, errors, types of side effects, custom)
- transforms return results instead of pushing them through in an imperative manner
- support promise-returning functions, but don't mandate promise support for apps that don't need it

## api

### graph creation

#### `create(tailDef)`

Returns a built graph from the node definition, where the node definition represent's the tail of the graph.

Each transform definition function (.e.g. `map` below) returns a function that takes in a parent node definition or array of parent node definitions and returns a new node definition.

```js
const input = src();
const graph = pipe(src, map(console.log));
dispatch(create(graph), src(23));
```

#### `pipe(value, fns)`

#### `dispatch(msg)`

#### `input([fn])`

#### `except(fn)`

### transforms

#### `map(fn)`

#### `filter(fn)`

#### `reduce(initFn, reduceFn)`

#### `joinEvents(mapFn, inputs)`

### lower level api

#### transform definitions

In the simplest case, a transform can be defined as a function. A transform function takes in the transform's current `state`, the `value` to be transformed, and an `opts` object. It should return a tuple of the form `[nextState, result]`, where `nextState` represents the transform's new state, and `result` represents the value to be propagated to the transform's child node.

The given `opts` object contains the following properties:

- `source`: the input from which propagation started
- `parent`: the definition of the transform or input from which `value` propagated
- `dispatch`: a reference to [`graph.dispatch()`](#graph-dispatch-src-value).

### propagating multiple values

### short-circuiting propagation with `nil`

#### `message(type, value)`

#### `trap(transformDef)`

### internal utilities

#### `conj(...objects)`
