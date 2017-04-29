import test from 'ava';
import {create, input, strsplit} from '../src';
import {capture} from './utils';


test('strsplit', t => {
  const src = input();
  const res = [];

  const graph = [src]
    .concat(strsplit('.'))
    .concat(capture(res));

  const dispatch = create(graph).dispatch.bind(null, src);

  dispatch('a');
  dispatch('b');
  t.deepEqual(res, []);

  dispatch('c.de.fg');
  t.deepEqual(res, ['abc', 'de']);

  dispatch('.');
  t.deepEqual(res, ['abc', 'de', 'fg']);
});
