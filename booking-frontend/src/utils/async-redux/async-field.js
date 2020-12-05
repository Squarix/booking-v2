import AsyncReducer from './reducer-helper/async-reducer';
import AsyncAction from './actions-helper/async-action';
import {asyncTypeKey} from './async-types-map';
import ClearAction from './actions-helper/clear-action';

export default class AsyncField {
  constructor({
    reducerTemplate,
    actionOptions = AsyncField.DEFAULT_ACTION_OPTIONS,
  }) {
    const constantPrefix = `${actionOptions.method}_${
      reducerTemplate.name
    }_${actionOptions.uri.toUpperCase()}`;

    const types = asyncTypeKey(this, constantPrefix);

    this.initialState = reducerTemplate.initialState;

    this.reducer = new AsyncReducer({
      types,
      template: reducerTemplate,
    }).func;

    this.action = new AsyncAction({
      types,
      ...actionOptions,
    }).func;

    this.clearAction = new ClearAction(types).func;
  }
}

AsyncField.REDUCER_TEMPLATES = AsyncReducer.TEMPLATES;
AsyncField.METHODS = AsyncAction.METHODS;

AsyncField.DEFAULT_ACTION_OPTIONS = {
  uri: '',
  request: null,
  method: 'GET',
  defaultURLParams: new URLSearchParams(),
};
