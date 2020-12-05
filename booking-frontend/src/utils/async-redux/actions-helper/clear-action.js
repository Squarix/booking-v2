import AbstractAction from './abstract-action';

export default class ClearAction extends AbstractAction {
  constructor(types) {
    const typesArray = Array.isArray(types) ? types : [types];
    super(typesArray);
    this.actions = this.getClearActions(typesArray);
  }

  checkTypes(types) {
    types.forEach(typesObj => AbstractAction.checkType(typesObj, 'CLEAR'));
  }

  getClearActions(typesArray) {
    return typesArray.map(type => ({type: type.CLEAR}));
  }

  get func() {
    return () => async dispatch => {
      this.actions.map(action => {
        dispatch(action);
      });
    };
  }
}
