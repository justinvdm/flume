import test from 'ava';
import { create, input, map } from '..';
import { capture } from './utils';


test('map', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(map(v => v * 2))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3);

  t.deepEqual(res, [4, 6]);
});
