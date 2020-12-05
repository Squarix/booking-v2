import BaseReducerTemplate from './base-reducer-template';
import {
  CreateModelTemplate,
  EditModelTemplate,
  ManyModelsTemplate,
} from './reducer-templates';

export default class AsyncReducer {
  constructor({types, template = AsyncReducer.DEFAULT_TEMPLATE}) {
    this.types = types;

    this.template = template;
  }

  get func() {
    return (state = this.template.initialState, action) => {
      switch (action.type) {
        case this.types.DEFAULT:
          return this.template.onDefault(state, action);

        case this.types.SUCCESS:
          return this.template.onSuccess(state, action);

        case this.types.ERROR:
          return this.template.onError(state, action);

        case this.types.CLEAR:
          return {...state, ...this.template.initialState};

        default:
          return state;
      }
    };
  }
}

AsyncReducer.DEFAULT_TEMPLATE = new BaseReducerTemplate();

AsyncReducer.TEMPLATES = {
  ONE_MODEL: AsyncReducer.DEFAULT_TEMPLATE,
  MANY_MODELS: new ManyModelsTemplate(),
  EDIT_MODEL: new EditModelTemplate(),
  CREATE_MODEL: new CreateModelTemplate(),
};
