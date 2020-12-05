import AsyncAction from './async-action';
import AsyncActionType from '../action-types/async-action-type';
import ActionType from '../action-types/type';
import Action from './action';
import ClearAction from './clear-action';

export function initAsyncActions(request) {
  function asyncAction({types, uri, model, method, defaultURLParams}) {
    const action = new AsyncAction({
      types,
      uri,
      model,
      method,
      defaultURLParams,
      request,
    });

    return Object.assign(action.func, {
      defaultURLParams: action.defaultURLParams,
      baseUri: action.baseUri,
      method: action.method,
      types: action.types,
    });
  }

  asyncAction.METHODS = AsyncAction.METHODS;

  return asyncAction;
}

export function asyncType(model, type) {
  return new AsyncActionType(model, type);
}

asyncType.TEMPLATES = AsyncActionType.TEMPLATES;

export function action(types) {
  const action = new Action(types);

  return Object.assign(action.func, {types: action.types});
}

export function type(model, type) {
  return new ActionType(model, type);
}

type.TEMPLATES = ActionType.TEMPLATES;

export function clearAction(types) {
  const action = new ClearAction(types);

  return Object.assign(action.func, {actions: action.actions});
}
