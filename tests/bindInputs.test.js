import test from 'ava';
import {create, input, map, bindInputs} from '../src';
import {capture} from './utils';


test('bindInputs', t => {
  const a = input();
  const b = input();
  const res = [];

  const graph = [[
    [a]
      .concat(bindInputs((v, inputs) => inputs.b(v), {b})),

    [b]
      .concat(capture(res))
  ]];

  create(graph)
    .dispatch(a, 21)
    .dispatch(a, 23);

  t.deepEqual(res, [21, 23]);
});


test('default bind fn', t => {
  const a = input();
  const b = input();
  const res = [];

  const graph = [[
    [a]
      .concat(bindInputs({b}))
      .concat(map(({v, b}) => b(v))),

    [b]
      .concat(capture(res))
  ]];

  create(graph)
    .dispatch(a, {v: 21})
    .dispatch(a, {v: 23});

  t.deepEqual(res, [21, 23]);
});
