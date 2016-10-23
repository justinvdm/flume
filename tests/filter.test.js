import test from 'ava';
import { create, input, filter } from '..';
import { capture } from './utils';


test('filter', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(filter(v => !(v % 2)))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3)
    .dispatch(src, 4)
    .dispatch(src, 5)
    .dispatch(src, 6);

  t.deepEqual(res, [2, 4, 6]);
});
