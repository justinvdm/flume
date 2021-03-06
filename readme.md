# `flume`

[![Build Status](https://travis-ci.org/justinvdm/flume-core.svg?branch=master)](https://travis-ci.org/justinvdm/flume)

> a library for defining applications as a set of inputs and transformations

**note** flume is more of an experiment at this point, don't use in it
production and expect the api to change. The current documentation also leaves
much to be desired. If this experiment sees some success, better documentation
on what flume is and how it can be used can be expected.

```js
import { create, input, map, reduce } from 'flume-js'

const src1 = input()
const src2 = input()

const a = [src1].concat(map(v => v * 2))

const b = [src2].concat(map(v => v * 3))

const graph = [[a, b]]
  .concat(
    reduce(
      () => 1,
      (total, v) => total + v
    )
  )
  .concat(map(console.log))

create(graph)
  .dispatch(src1, 1) // 3
  .dispatch(src2, 2) // 9
  .dispatch(src1, 3) // 15
```

## overview

### what is flume?

flume is a library for defining your applications as a set of inputs and
transformations of those inputs.

To some limited degree, it is along the same lines as
[Observables](https://github.com/tc39/proposal-observable) and libraries like
[rxjs](https://github.com/ReactiveX/rxjs) and
[xstream](http://staltz.com/xstream/).

### api overview

Applications can be thought of as pipelines. In the simplest case, we can have a
single input at the top, followed by transform functions:

```js
const src = input()

const app = create([src, map(v => v * 2), map(v => v + 1), map(console.log)])

app
  .dispatch(src, 2) // 5
  .dispatch(src, 3) // 7
```

We can also have multiple inputs at the top:

```js
const src1 = input()
const src2 = input()

const app = create([
  [src1, src2],
  map(v => v * 2),
  map(v => v + 1),
  map(console.log)
])

app
  .dispatch(src1, 2) // 5
  .dispatch(src2, 3) // 7
```

Applications can also be defined as pipelines of pipelines:

```js
import { create, input, map, reduce } from 'flume-js'

const src1 = input()
const src2 = input()

const app = create([
  [
    [src1, map(v => v * 2)],
    [src2, map(v => v * 3)]
  ],
  reduce(
    () => 1,
    (total, v) => total + v
  ),
  map(console.log)
])

app
  .dispatch(src1, 1) // 3
  .dispatch(src2, 2) // 9
  .dispatch(src1, 3) // 15
```

```js
const flatMap = fn => [].concat(flatten()).concat(map(fn))

const src = input()

const graph = [input].concat(flatMap(v => v * 2)).concat(map(console.log))

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
- support defining of message types (e.g. values, errors, types of side effects,
  custom)
- transforms return results instead of pushing them through in an imperitive
  manner
- support promise-returning functions, but don't mandate promise support for
  apps that don't need it

## api

### graph creation

#### `create(graphDef)`

Returns a built graph from the given graph definition.

Graphs are defined as arrays. The first element of the array may be an
[`input`](#input), a graph definition, or an array of either of these. All
following array elements may only be a [transform](#transforms) (see
[transform definitions](#transform-definitions) for a lower-level api for
defining these).

```js
const src = input()

const app = [src].concat(map(console.log))

create(app).dispatch(src, 23) // 23
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

In the simplest case, a transform can be defined as a function. A transform
function takes in the transform's current `state`, the `value` to be
transformed, and an `opts` object. It should return an object containing with
the folling properties:

- `state`: the transform's new state. If omitted, the node's current state is
  assumed.
- `value` / `values`: the result value to propagated to the next transform in
  the chain. If specified using the property name `values`, the property is
  taken as an [array of result values](#propagating-multiple-values) to be
  propagated sequentially.

```js
const src = input()

const graph = [src]
  .concat((state, v) => ({
    state: (state || 0) + v,
    value: (state || 0) + v + 1
  }))
  .concat(map(console.log))

create(graph)
  .dispatch(src, 1) // 2
  .dispatch(src, 2) // 4
```

If `value`/`values` are omitted but `state` is given, `state` is used as both
the transform's new state _and_ the result value to be propagated.

```js
const src = input()

const graph = [src]
  .concat((state, v) => ({ state: (state || 0) + v }))
  .concat(map(console.log))

create(graph)
  .dispatch(src, 2) // 2
  .dispatch(src, 3) // 5
```

The given `opts` object contains the following properties:

- `source`: the input from which propagation started
- `parent`: the definition of the transform or input from which `value`
  propagated
- `dispatch`: a reference to [`graph.dispatch()`](#graph-dispatch-src-value).

### propagating multiple values

### short-circuiting propagation with `nil`

#### `message(type, value)`

#### `trap(transformDef)`

### internal utilities

#### `maybeAsync(fn)`

#### `resolveSeq(values)`

#### `conj(...objects)`

## install

You can use this library as the npm package `flume-js`:

```
npm i flume-js
# or
yarn add flume-js
```

It can be used in both es-module-aware and commonjs bundlers/environments.

```js
// es module
import { create } from 'flume-js'

// or alternatively
import create from 'flume-js/create'

// commonjs
const { create } = require('flume-js')

// or alternatively
const create = require('flume-js/create')
```

It can also be used a `<script>`:

```html
<script
  crossorigin
  src="https://unpkg.com/pipe-with/dist/umd/flume.js"
></script>

<script>
  flume.create(...)
</script>
```
