import test from 'ava';
import { create, input, reduce } from '..';
import { capture } from './utils';


test('reduce', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(reduce(() => 10, (total, v) => total + v))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3);

  t.deepEqual(res, [12, 15]);
});
