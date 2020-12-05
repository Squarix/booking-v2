import AsyncReducer from './async-reducer';

export function asyncReducer({types, template}) {
  const reducer = new AsyncReducer({types, template});

  return Object.assign(reducer.func, {
    types: reducer.types,
    initialState: reducer.template.initialState,
  });
}

asyncReducer.DEFAULT_TEMPLATE = AsyncReducer.DEFAULT_TEMPLATE;
asyncReducer.TEMPLATES = AsyncReducer.TEMPLATES;
