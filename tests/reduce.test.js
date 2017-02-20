import test from 'ava';
import {create, input, reduce} from '..';
import {capture, defer} from './utils';


test('reduce', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(reduce(() => 10, (total, v, {source}) => total + v + (source === src)))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3);

  t.deepEqual(res, [13, 17]);
});


test('no init', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(reduce((total, v) => (total || 0) + v))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3);

  t.deepEqual(res, [2, 5]);
});


test('promise support', async t => {
  const src = input();
  const res = [];
  const d = defer();

  const graph = [src]
    .concat(reduce(() => 10, (total, v) => Promise.resolve(total + v)))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3, d.resolve);

  await d.promise;
  t.deepEqual(res, [12, 15]);
});
