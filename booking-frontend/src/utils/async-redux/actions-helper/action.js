import AbstractAction from './abstract-action';

export default class Action extends AbstractAction {
  get func() {
    return payload => async dispatch => {
      try {
        dispatch(this.getDefaultAction(payload));
      } catch (error) {}
    };
  }
}
