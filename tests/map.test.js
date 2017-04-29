import test from 'ava';
import {create, input, map} from '../src';
import {capture} from './utils';


test('map', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(map((v, {source}) => (v + (src === source)) * 2))
    .concat(capture(res));

  create(graph)
    .dispatch(src, 2)
    .dispatch(src, 3);

  t.deepEqual(res, [6, 8]);
});
