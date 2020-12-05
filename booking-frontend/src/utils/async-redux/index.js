import { combineReducers } from 'redux';

import AsyncField from './async-field';
import { clearAction } from './actions-helper';
import AsyncReducer from './reducer-helper/async-reducer';

export function initAsyncFields(request) {
  function asyncReduxField({ reducerTemplate, actionOptions }) {
    return new AsyncField({
      reducerTemplate,
      actionOptions: { ...actionOptions, request },
    });
  }

  asyncReduxField.REDUCER_TEMPLATE = AsyncReducer.TEMPLATES;
  asyncReduxField.METHODS = AsyncField.METHODS;

  return asyncReduxField;
}

export function combineFieldReducers(fieldsObject) {
  const reducersObject = Object.entries(fieldsObject).reduce(
    (acc, [key, field]) => {
      acc[key] = field.reducer;
      return acc;
    },
    {}
  );

  return combineReducers(reducersObject);
}

export function isField(field) {
  return field instanceof AsyncField;
}

export function clearFieldsAction(fields) {
  let fieldsArray = fields;

  if (isField(fields)) fieldsArray = [fields];

  const typesArray = fieldsArray.forEach(isField).map(field => field.types);

  return clearAction(typesArray);
}
