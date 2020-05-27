import test from 'ava'
import { create, input, sink } from '..'
import { capture, defer } from './utils'

test('sink', t => {
  const src = input()
  const res = []

  const graph = [src]
    .concat(
      sink(
        () => 10,
        (total, v, { source }) => total + v + (source == src)
      )
    )
    .concat(capture(res))

  create(graph).dispatch(src, 2).dispatch(src, 3)

  t.deepEqual(res, [13, 14])
})

test('promise support', async t => {
  const src = input()
  const res = []
  const d = defer()

  const graph = [src]
    .concat(
      sink(
        () => 10,
        (total, v) => Promise.resolve(total + v)
      )
    )
    .concat(capture(res))

  create(graph).dispatch(src, 2).dispatch(src, 3, d.resolve)

  await d.promise
  t.deepEqual(res, [12, 13])
})
