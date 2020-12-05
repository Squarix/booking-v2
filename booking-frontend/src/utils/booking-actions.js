import {
  initAsyncActions,
  action,
  clearAction,
} from './async-redux/actions-helper';
import {initAsyncFields} from './async-redux';
import request from "./request";

const asyncAction = initAsyncActions(request);

export {asyncAction, clearAction, action};

export const asyncField = initAsyncFields(request);

