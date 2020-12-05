export default class AbstractAction {
  constructor(types = {DEFAULT: null}) {
    this.checkTypes(types);

    this.types = types;
  }

  static checkType(types, field) {
    if (!types[field])
      throw new ReferenceError(
        `AbstractAction: ${field} type is ${types[field]}!`
      );

    if (typeof types[field] !== 'string')
      throw new TypeError(`AbstractAction: ${field} type does must be String!`);
  }

  checkTypes(types) {
    AbstractAction.checkType(types, 'DEFAULT');
  }

  get func() {
    throw new ReferenceError('AbstractAction: get action() is not implemented');
  }

  getDefaultAction(payload) {
    return {type: this.types.DEFAULT, payload};
  }
}
