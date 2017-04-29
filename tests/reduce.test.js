import test from 'ava';
import {create, input, reduce} from '../src';
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


test('source pairs reducer', t => {
  const src1 = input();
  const src2 = input();
  const src3 = input();
  const res = [];

  const graph = [[src1, src2, src3]]
    .concat(reduce(() => 0, [
      [src1, (total, v) => total + v],
      [src2, (total, v) => total - v]
    ]))
    .concat(capture(res));

  create(graph)
    .dispatch(src1, 2)
    .dispatch(src2, 3)
    .dispatch(src2, 8)
    .dispatch(src1, 7)
    .dispatch(src3, 9)
    .dispatch(src1, 4);

  t.deepEqual(res, [2, -1, -9, -2, 9, 13]);
});


test('source pairs reducer default', t => {
  const src1 = input();
  const src2 = input();
  const src3 = input();
  const res = [];

  const graph = [[src1, src2, src3]]
    .concat(reduce(() => 0, [
      [src1, (total, v) => total + v],
      [src2, (total, v) => total - v],
      (total, v) => total * v
    ]))
    .concat(capture(res));

  create(graph)
    .dispatch(src1, 2)
    .dispatch(src2, 3)
    .dispatch(src2, 8)
    .dispatch(src1, 7)
    .dispatch(src3, 9)
    .dispatch(src1, 4);

  t.deepEqual(res, [2, -1, -9, -2, -18, -14]);
});


test('unsupported reducer type', t => {
  t.throws(
    () => create([input].concat(reduce(23))),
    'Unsupported reducer type given to reduce(): number');
});
