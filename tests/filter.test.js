import test from 'ava';
import {create, input, filter} from '..';
import {capture, defer} from './utils';


test('filter', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(filter((v, {source}) => (v + (src === source)) % 2))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3)
    .dispatch(src, 4)
    .dispatch(src, 5)
    .dispatch(src, 6);

  t.deepEqual(res, [2, 4, 6]);
});


test('default function', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(filter())
    .concat(capture(res));

  create(graph)
    .dispatch(src, false)
    .dispatch(src, 0)
    .dispatch(src, 1)
    .dispatch(src, true)
    .dispatch(src, 3);

  t.deepEqual(res, [1, true, 3]);
});


test('promise support', async t => {
  const src = input();
  const res = [];
  const d = defer();

  const graph = [src]
    .concat(filter(v => Promise.resolve(!(v % 2))))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3)
    .dispatch(src, 4)
    .dispatch(src, 5)
    .dispatch(src, 6, d.resolve);

  await d.promise;
  t.deepEqual(res, [2, 4, 6]);
});
