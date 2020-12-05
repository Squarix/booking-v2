import ActionType from './type';

export default class AsyncActionType extends ActionType {
  formTypeMap(TYPE) {
    return {
      DEFAULT: TYPE,
      SUCCESS: `${TYPE}_SUCCESS`,
      ERROR: `${TYPE}_ERROR`,
      CLEAR: `${TYPE}_CLEAR`,
    };
  }
}
