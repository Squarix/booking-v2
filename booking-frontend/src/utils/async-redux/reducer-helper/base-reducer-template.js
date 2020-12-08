export default class BaseReducerTemplate {
  constructor(initialState) {
    this.name = 'ONE';
    this.initialState =
      initialState || BaseReducerTemplate.DEFAULT_INITIAL_STATE;
  }

  onDefault(state, action) {
    return {
      ...state,
      pending: true,
      error: null,
    };
  }

  onSuccess(state, action) {
    return {
      ...state,
      data: action.payload,
      pending: false,
      error: null,
    };
  }

  onError(state, action) {
    return {
      ...state,
      data: null,
      pending: false,
      error: action.payload,
    };
  }
}

BaseReducerTemplate.DEFAULT_INITIAL_STATE = {
  data: null,
  pending: false,
  error: null,
};
