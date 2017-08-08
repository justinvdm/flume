import {transform, dispatch} from '..';

function joinEvents(mapFn/*:Function*/, inputs/*:MapType<InputDef>*/) {
  return transform(initFn, transformFn);

  function transformFn(events/*:MapType<Function>*/, v/*:any*/)/*:[MapType<Function>, any]*/ {
    return [events, mapFn(events, v)];
  }

  function initFn(graph/*:Graph*/)/*:MapType<Function>*/ {
    var events = {};

    for (var k in inputs) {
      if (inputs.hasOwnProperty(k)) {
        events[k] = createEventDispatcher(graph, inputs[k]);
      }
    }

    return events;
  }
}

function createEventDispatcher(graph/*:Graph*/, input/*:InputDef*/)/*:Function*/ {
  return function eventDispatcherFn(v/*:any*/) {
    dispatch(graph, input, v);
  };
}

export default joinEvents;
