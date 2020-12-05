export default class ActionType {
  constructor(TYPE = '') {
    Object.assign(this, this.formTypeMap(TYPE));
  }

  formTypeMap(TYPE) {
    return {
      DEFAULT: TYPE,
    };
  }
}
