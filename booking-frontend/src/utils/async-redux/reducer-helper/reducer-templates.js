import BaseReducerTemplate from './base-reducer-template';

export class ManyModelsTemplate extends BaseReducerTemplate {
  constructor() {
    super({
      ...BaseReducerTemplate.DEFAULT_INITIAL_STATE,
      data: [],
      count: 0,
      urlParams: new URLSearchParams(),
    });

    this.name = 'MANY';
  }

  onDefault(state, action) {
    return {
      ...state,
      urlParams: action.payload,
      pending: true,
      error: null,
    };
  }

  onSuccess(state, action) {
    return {
      ...state,
      data: action.payload.results,
      count: action.payload.count,
      pending: false,
      error: null,
    };
  }

  onError(state, action) {
    return {
      ...state,
      data: [],
      count: 0,
      pending: false,
      error: action.payload,
    };
  }
}

export class EditModelTemplate extends BaseReducerTemplate {
  constructor() {
    super({
      ...BaseReducerTemplate.DEFAULT_INITIAL_STATE,
      success: false,
    });
    this.name = 'EDIT';
  }

  onDefault(state, action) {
    return {
      ...state,
      success: false,
      error: null,
      pending: true,
    };
  }

  onSuccess(state, action) {
    return {
      ...state,
      data: action.payload,
      success: true,
      error: null,
      pending: false,
    };
  }

  onError(state, action) {
    return {
      ...state,
      data: null,
      success: false,
      error: action.payload,
      pending: false,
    };
  }
}

export class CreateModelTemplate extends BaseReducerTemplate {
  constructor() {
    super({
      ...BaseReducerTemplate.DEFAULT_INITIAL_STATE,
      success: false,
    });
    this.name = 'CREATE';
  }

  onDefault(state, action) {
    return {
      ...state,
      success: false,
      error: null,
      pending: true,
    };
  }

  onSuccess(state, action) {
    return {
      ...state,
      data: action.payload,
      success: true,
      error: null,
      pending: false,
    };
  }

  onError(state, action) {
    return {
      ...state,
      data: null,
      success: false,
      error: action.payload,
      pending: false,
    };
  }
}
