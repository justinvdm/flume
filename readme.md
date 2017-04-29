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

const app = create([
  src,
  map(v => v * 2),
  map(v => v + 1),
  map(console.log)
]);

app
  .dispatch(src, 2)  // 5
  .dispatch(src, 3)  // 7
```

We can also have multiple inputs at the top:

```js
const src1 = input();
const src2 = input();

const app = create([
  [src1, src2],
  map(v => v * 2),
  map(v => v + 1),
  map(console.log)
]);

app
  .dispatch(src1, 2)  // 5
  .dispatch(src2, 3)  // 7
```

Applications can also be defined as pipelines of pipelines:

```js
import {create, input, map, reduce} from 'flume-js';

const src1 = input();
const src2 = input();

const app = create([
  [[src1, map(v => v * 2)], [src2, map(v => v * 3)]],
  reduce(() => 1, (total, v) => total + v),
  map(console.log)
])

app
  .dispatch(src1, 1)   // 3
  .dispatch(src2, 2)   // 9
  .dispatch(src1, 3);  // 15
```

**note** The examples above use array literals to define the application. While this helps for demonstration purposes, the indended convention for defining applications is to use [`Array.prototype.concat()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat). This allows us to define applications using a chainable api without flume needing to create some wrapper api to achieve the same result. More importantly though, since `Array.prototype.concat` accepts arrays of values, this also gives us a pattern for appending multiple transforms. For example:

```js
const flatMap = fn => []
  .concat(flatten())
  .concat(map(fn));

const src = input();

const graph = [input]
  .concat(flatMap(v => v * 2))
  .concat(map(console.log));

create(graph)
  .dispatch(src, 2)
// 4
  .dispatch(src, [3, 4])
// 6
// 8
```

### value propagation

### error propagation

### main design goals
- constrain applications to statically defined graph of inputs and transforms
- support defining of message types (e.g. values, errors, types of side effects, custom)
- transforms return results instead of pushing them through in an imperitive manner
- support promise-returning functions, but don't mandate promise support for apps that don't need it

## api

### graph creation

#### `create(graphDef)`

Returns a built graph from the given graph definition.

Graphs are defined as arrays. The first element of the array may be an [`input`](#input), a graph definition, or an array of either of these. All following array elements may only be a [transform](#transforms) (see [transform definitions](#transform-definitions) for a lower-level api for defining these).

```js
const src = input();

const app = [src]
  .concat(map(console.log));

create(app)
  .dispatch(src, 23);  // 23
```

#### `graph.dispatch(src, value)`

#### `input()`

#### `except(fn)`

### transforms

#### `map(fn)`

#### `filter([fn])`

#### `strsplit(sep)`

#### `sink(initFn, processFn)`

### lower level api

#### transform definitions

In the simplest case, a transform can be defined as a function. A transform function takes in the transform's current `state`, the `value` to be transformed, and an `opts` object. It should return an array containing the transform's new state as its first element and the value to be propagated as its second element.

```js
const src = input();

const graph = [src]
  .concat((state, v) => [(state || 0) + v, (state || 0) + v + 1])
  .concat(map(console.log));

create(graph)
  .dispatch(src, 1)  // 2
  .dispatch(src, 2);  // 4
```

If an array with a single value is returned, the value is taken as both the transform's new state, and the value to be propagated.

```js
const src = input();

const graph = [src]
  .concat((state, v) => [(state || 0) + v])
  .concat(map(console.log));

create(graph)
  .dispatch(src, 2)  // 2
  .dispatch(src, 3);  // 5
```

The given `opts` object contains the following properties:

- `source`: the input from which propagation started
- `parent`: the definition of the transform or input from which `value` propagated
- `dispatch`: a reference to [`graph.dispatch()`](#graph-dispatch-src-value).

### propagating multiple values

### short-circuiting propagation with `nil`

#### `message(type, value)`

#### `trap(transformDef)`

### internal utilities

#### `maybeAsync(fn)`

#### `resolveSeq(values)`

#### `conj(...objects)`
